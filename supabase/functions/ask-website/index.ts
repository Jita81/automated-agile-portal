import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const ALLOWED_ORIGINS = [
  'https://automated-agile-portal.lovable.app',
  'https://id-preview--9852b81a-f584-41ef-9f13-bf871be18f33.lovable.app',
  'https://9852b81a-f584-41ef-9f13-bf871be18f33.lovableproject.com',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    'Vary': 'Origin',
  };
}

const MAX_REQUESTS = 20;
const WINDOW_MINUTES = 15;
const GROQ_MODEL = 'llama-3.3-70b-versatile';
const MAX_TOKENS = 400;

const SYSTEM_PROMPT = `You are the website assistant for Automated Agile (automatedagile.co.uk).

Rules:
- Answer using ONLY the provided website context below. Do not use any outside knowledge.
- If the answer is not contained in the context, respond with exactly: "I can't find that on this website."
- Be concise and accurate. Aim for 2-4 sentences unless the question requires more detail.
- Where possible, mention which section the information comes from.
- Do not invent products, prices, policies, roles, or contact details.
- Do not repeat the question back to the user.`;

function getClientIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  if (forwarded) {
    const last = forwarded.split(',').pop()?.trim();
    if (last) return last;
  }
  return 'unknown';
}

interface Chunk {
  id: string;
  url: string;
  page_title: string;
  section_heading: string;
  text: string;
}

let cachedChunks: Chunk[] | null = null;

async function loadChunks(): Promise<Chunk[]> {
  if (cachedChunks) return cachedChunks;

  const res = await fetch(
    'https://automated-agile-portal.lovable.app/ai/index/chunks.json',
  );
  if (!res.ok) throw new Error(`Failed to load chunks: ${res.status}`);
  cachedChunks = await res.json();
  return cachedChunks!;
}

function buildUserMessage(question: string, chunks: Chunk[]): string {
  const contextBlocks = chunks
    .map(
      (c, i) =>
        `[Section ${i + 1}: ${c.page_title} — ${c.section_heading}]\n${c.text}`,
    )
    .join('\n\n');

  return `Website context:\n${contextBlocks}\n\nQuestion: ${question}`;
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // --- Rate limiting ---
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const ip = getClientIp(req);
  const windowStart = new Date(
    Date.now() - WINDOW_MINUTES * 60 * 1000,
  ).toISOString();

  const { count, error: rateError } = await supabase
    .from('chat_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('attempted_at', windowStart);

  if (!rateError && (count ?? 0) >= MAX_REQUESTS) {
    return new Response(
      JSON.stringify({
        error: 'Too many questions — please try again in a few minutes.',
      }),
      {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }

  await supabase.from('chat_attempts').insert({ ip });

  // --- Parse request ---
  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const question =
    typeof body?.question === 'string' ? body.question.trim() : '';

  if (!question || question.length > 500) {
    return new Response(
      JSON.stringify({
        error: question ? 'Question is too long.' : 'Question is required.',
      }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }

  // --- Load content chunks ---
  let chunks: Chunk[];
  try {
    chunks = await loadChunks();
  } catch (err) {
    console.error('Failed to load chunks:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to load website content.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }

  // --- Call Groq ---
  const groqKey = Deno.env.get('GROQ_API_KEY');
  if (!groqKey) {
    console.error('GROQ_API_KEY not configured');
    return new Response(
      JSON.stringify({ error: 'Chat service is not configured.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }

  try {
    const groqRes = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${groqKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            { role: 'user', content: buildUserMessage(question, chunks) },
          ],
          max_tokens: MAX_TOKENS,
          temperature: 0.2,
        }),
      },
    );

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      console.error('Groq API error:', groqRes.status, errText);
      return new Response(
        JSON.stringify({ error: 'AI service temporarily unavailable.' }),
        {
          status: 502,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        },
      );
    }

    const groqData = await groqRes.json();
    const answer =
      groqData.choices?.[0]?.message?.content?.trim() ??
      "I can't find that on this website.";

    const noAnswer =
      answer.toLowerCase().includes("can't find") ||
      answer.toLowerCase().includes('cannot find') ||
      answer.trim().length < 5;

    const sources = noAnswer
      ? []
      : chunks.slice(0, 3).map((c) => ({
          title: `${c.page_title} — ${c.section_heading}`,
          url: c.url,
        }));

    return new Response(JSON.stringify({ answer, sources, noAnswer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Groq call failed:', err);
    return new Response(
      JSON.stringify({ error: 'Something went wrong. Please try again.' }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      },
    );
  }
});

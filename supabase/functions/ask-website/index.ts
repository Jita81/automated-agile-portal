import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? 'unknown';
  console.log(`[ask-website] Origin: "${origin}"`);
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  const url = 'https://automated-agile-portal.lovable.app/ai/index/chunks.json';
  console.log(`[ask-website] Fetching chunks from: ${url}`);
  const res = await fetch(url);
  console.log(`[ask-website] Chunks fetch status: ${res.status}`);
  if (!res.ok) throw new Error(`Failed to load chunks: ${res.status}`);
  cachedChunks = await res.json();
  console.log(`[ask-website] Loaded ${cachedChunks!.length} chunks`);
  return cachedChunks!;
}

function buildUserMessage(question: string, chunks: Chunk[]): string {
  const contextBlocks = chunks
    .map((c, i) => `[Section ${i + 1}: ${c.page_title} — ${c.section_heading}]\n${c.text}`)
    .join('\n\n');
  return `Website context:\n${contextBlocks}\n\nQuestion: ${question}`;
}

async function logToDb(
  supabase: ReturnType<typeof createClient>,
  data: {
    ip: string;
    question: string;
    answer?: string;
    no_answer?: boolean;
    error?: string;
    duration_ms?: number;
    origin?: string;
  },
) {
  const { error } = await supabase.from('chat_logs').insert({
    ...data,
    groq_model: GROQ_MODEL,
  });
  if (error) {
    console.warn('[ask-website] Failed to write chat log (non-fatal):', error.message);
  }
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  const startTime = Date.now();

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  console.log(`[ask-website] SUPABASE_URL set: ${!!supabaseUrl}`);
  console.log(`[ask-website] SUPABASE_SERVICE_ROLE_KEY set: ${!!supabaseKey}`);

  const supabase = createClient(supabaseUrl!, supabaseKey!);

  const ip = getClientIp(req);
  const origin = req.headers.get('origin') ?? 'unknown';

  // --- Rate limiting ---
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();
  const { count, error: rateError } = await supabase
    .from('chat_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('attempted_at', windowStart);

  if (rateError) {
    console.warn('[ask-website] Rate limit check failed (non-fatal):', rateError.message);
  }

  if (!rateError && (count ?? 0) >= MAX_REQUESTS) {
    const msg = 'Too many questions — please try again in a few minutes.';
    console.log(`[ask-website] Rate limited IP: ${ip}`);
    return new Response(JSON.stringify({ error: msg }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  await supabase.from('chat_attempts').insert({ ip });

  // --- Parse request ---
  let body: { question?: unknown };
  try {
    body = await req.json();
  } catch (e) {
    console.error('[ask-website] Failed to parse request body:', e);
    return new Response(JSON.stringify({ error: 'Invalid request body' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  const question = typeof body?.question === 'string' ? body.question.trim() : '';
  console.log(`[ask-website] Question received (${question.length} chars): "${question.slice(0, 100)}"`);

  if (!question || question.length > 500) {
    const errMsg = question ? 'Question is too long.' : 'Question is required.';
    return new Response(JSON.stringify({ error: errMsg }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // --- Load content chunks ---
  let chunks: Chunk[];
  try {
    chunks = await loadChunks();
  } catch (err: any) {
    const errMsg = `Failed to load website content: ${err.message}`;
    console.error('[ask-website]', errMsg);
    await logToDb(supabase, { ip, question, error: errMsg, duration_ms: Date.now() - startTime, origin });
    return new Response(JSON.stringify({ error: 'Failed to load website content.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // --- Check Groq key ---
  const groqKey = Deno.env.get('GROQ_API_KEY');
  console.log(`[ask-website] GROQ_API_KEY set: ${!!groqKey}`);
  if (!groqKey) {
    const errMsg = 'GROQ_API_KEY not configured';
    console.error('[ask-website]', errMsg);
    await logToDb(supabase, { ip, question, error: errMsg, duration_ms: Date.now() - startTime, origin });
    return new Response(JSON.stringify({ error: 'Chat service is not configured.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  // --- Call Groq ---
  console.log(`[ask-website] Calling Groq model: ${GROQ_MODEL}`);
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
    });

    console.log(`[ask-website] Groq response status: ${groqRes.status}`);

    if (!groqRes.ok) {
      const errText = await groqRes.text();
      const errMsg = `Groq API error ${groqRes.status}: ${errText}`;
      console.error('[ask-website]', errMsg);
      await logToDb(supabase, { ip, question, error: errMsg, duration_ms: Date.now() - startTime, origin });
      return new Response(JSON.stringify({ error: 'AI service temporarily unavailable.' }), {
        status: 502,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const groqData = await groqRes.json();
    const answer = groqData.choices?.[0]?.message?.content?.trim() ?? "I can't find that on this website.";
    console.log(`[ask-website] Answer (${answer.length} chars): "${answer.slice(0, 100)}"`);

    const noAnswer =
      answer.toLowerCase().includes("can't find") ||
      answer.toLowerCase().includes('cannot find') ||
      answer.trim().length < 5;

    const sources = noAnswer
      ? []
      : chunks.slice(0, 3).map((c) => ({ title: `${c.page_title} — ${c.section_heading}`, url: c.url }));

    const duration_ms = Date.now() - startTime;
    console.log(`[ask-website] Completed in ${duration_ms}ms. noAnswer=${noAnswer}`);

    await logToDb(supabase, { ip, question, answer, no_answer: noAnswer, duration_ms, origin });

    return new Response(JSON.stringify({ answer, sources, noAnswer }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    const errMsg = `Groq call threw: ${err.message}`;
    console.error('[ask-website]', errMsg);
    await logToDb(supabase, { ip, question, error: errMsg, duration_ms: Date.now() - startTime, origin });
    return new Response(JSON.stringify({ error: 'Something went wrong. Please try again.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});

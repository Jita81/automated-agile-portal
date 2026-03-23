import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { create, verify, getNumericDate } from 'https://deno.land/x/djwt@v3.0.2/mod.ts';

const ALLOWED_ORIGINS = [
  'https://automated-agile-portal.lovable.app',
  'https://id-preview--9852b81a-f584-41ef-9f13-bf871be18f33.lovable.app',
];

function getCorsHeaders(req: Request): Record<string, string> {
  const origin = req.headers.get('origin') ?? '';
  const allowedOrigin = ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-admin-password',
    'Vary': 'Origin',
  };
}

const MAX_ATTEMPTS = 10;
const WINDOW_MINUTES = 15;

/**
 * Resolve the real client IP using infrastructure-injected headers.
 * Priority: CF-Connecting-IP (Cloudflare, cannot be spoofed) →
 *           x-real-ip (reverse proxy) →
 *           rightmost hop of x-forwarded-for (last trusted proxy) →
 *           fallback.
 */
function getClientIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip');
  if (cf) return cf.trim();

  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();

  const forwarded = req.headers.get('x-forwarded-for') ?? '';
  if (forwarded) {
    // Rightmost entry is set by the last trusted proxy — not client-controlled
    const last = forwarded.split(',').pop()?.trim();
    if (last) return last;
  }

  return 'unknown';
}

// Constant-time string comparison to prevent timing attacks
function safeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  const aBytes = new TextEncoder().encode(a);
  const bBytes = new TextEncoder().encode(b);
  let diff = 0;
  for (let i = 0; i < aBytes.length; i++) {
    diff |= aBytes[i] ^ bBytes[i];
  }
  return diff === 0;
}

async function getSigningKey(): Promise<CryptoKey> {
  const secret = Deno.env.get('ADMIN_JWT_SECRET');
  if (!secret) {
    throw new Error('ADMIN_JWT_SECRET is not configured');
  }
  return await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign', 'verify'],
  );
}

/**
 * Persistent rate limiter backed by the database.
 * Counts login attempts for the given IP within the last WINDOW_MINUTES.
 * Survives edge-function cold starts.
 */
async function isRateLimited(
  supabase: ReturnType<typeof createClient>,
  ip: string,
): Promise<boolean> {
  const windowStart = new Date(Date.now() - WINDOW_MINUTES * 60 * 1000).toISOString();

  const { count, error } = await supabase
    .from('admin_login_attempts')
    .select('id', { count: 'exact', head: true })
    .eq('ip', ip)
    .gte('attempted_at', windowStart);

  if (error) {
    console.error('rate-limit check error:', error);
    return false; // fail open rather than block legitimate admin
  }

  return (count ?? 0) >= MAX_ATTEMPTS;
}

async function recordAttempt(
  supabase: ReturnType<typeof createClient>,
  ip: string,
): Promise<void> {
  await supabase.from('admin_login_attempts').insert({ ip });
}

Deno.serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
  );

  const ip = getClientIp(req);
  const authHeader = req.headers.get('authorization') ?? '';
  const rawPassword = req.headers.get('x-admin-password') ?? '';

  // --- Path A: password login → validate, rate-limit, issue short-lived token ---
  if (rawPassword) {
    if (await isRateLimited(supabase, ip)) {
      return new Response(JSON.stringify({ error: 'Too many requests. Try again later.' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Record the attempt before checking so failed logins count immediately
    await recordAttempt(supabase, ip);

    const adminPassword = Deno.env.get('ADMIN_PASSWORD') ?? '';
    if (!adminPassword || !safeEqual(rawPassword, adminPassword)) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const key = await getSigningKey();
      const token = await create(
        { alg: 'HS256', typ: 'JWT' },
        { sub: 'admin', exp: getNumericDate(60 * 60) }, // 1 hour
        key,
      );
      return new Response(JSON.stringify({ token }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch {
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  // --- Path B: token bearer → verify JWT and return emails ---
  if (authHeader.startsWith('Bearer ')) {
    const token = authHeader.slice(7);
    try {
      const key = await getSigningKey();
      const payload = await verify(token, key);
      if (payload.sub !== 'admin') throw new Error('invalid sub');
    } catch {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    try {
      const { data: emails, error } = await supabase
        .from('download_emails')
        .select('id, email, created_at')
        .order('created_at', { ascending: false });

      if (error) throw error;

      return new Response(JSON.stringify({ emails }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.error('admin-get-emails error:', err);
      return new Response(JSON.stringify({ error: 'Internal server error' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  }

  return new Response(JSON.stringify({ error: 'Unauthorized' }), {
    status: 401,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
});

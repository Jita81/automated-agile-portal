
CREATE TABLE IF NOT EXISTS public.admin_login_attempts (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip          text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

-- Index for fast windowed counts
CREATE INDEX IF NOT EXISTS idx_admin_login_attempts_ip_time
  ON public.admin_login_attempts (ip, attempted_at);

-- No RLS needed — only the service role key touches this table
ALTER TABLE public.admin_login_attempts DISABLE ROW LEVEL SECURITY;


-- Add CHECK constraints to download_emails for server-side format enforcement
ALTER TABLE public.download_emails
  ADD CONSTRAINT email_format CHECK (email ~* '^[^\s@]+@[^\s@]+\.[^\s@]+$'),
  ADD CONSTRAINT email_length CHECK (char_length(email) <= 255);

-- Rate-limiting table for email submissions
CREATE TABLE IF NOT EXISTS public.email_submit_attempts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip           text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_email_submit_attempts_ip_time
  ON public.email_submit_attempts (ip, attempted_at);

ALTER TABLE public.email_submit_attempts ENABLE ROW LEVEL SECURITY;

-- Deny all direct client access; only service role (edge function) writes here
CREATE POLICY "No direct client access"
  ON public.email_submit_attempts
  FOR ALL
  TO authenticated, anon
  USING (false);

CREATE TABLE IF NOT EXISTS public.chat_attempts (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ip           text NOT NULL,
  attempted_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_chat_attempts_ip_time
  ON public.chat_attempts (ip, attempted_at);

ALTER TABLE public.chat_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No direct client access"
  ON public.chat_attempts
  FOR ALL
  TO authenticated, anon
  USING (false);

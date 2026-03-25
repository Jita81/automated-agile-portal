CREATE TABLE IF NOT EXISTS public.chat_logs (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at   timestamptz NOT NULL DEFAULT now(),
  ip           text,
  question     text NOT NULL,
  answer       text,
  no_answer    boolean DEFAULT false,
  error        text,
  duration_ms  integer,
  groq_model   text,
  origin       text
);

CREATE INDEX IF NOT EXISTS idx_chat_logs_created_at
  ON public.chat_logs (created_at DESC);

ALTER TABLE public.chat_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "No direct client access"
  ON public.chat_logs
  FOR ALL TO authenticated, anon
  USING (false);

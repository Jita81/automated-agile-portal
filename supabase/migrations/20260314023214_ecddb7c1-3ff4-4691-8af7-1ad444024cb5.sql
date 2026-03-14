
CREATE TABLE public.download_emails (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.download_emails ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit their email"
  ON public.download_emails
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "No public select"
  ON public.download_emails
  FOR SELECT
  USING (false);

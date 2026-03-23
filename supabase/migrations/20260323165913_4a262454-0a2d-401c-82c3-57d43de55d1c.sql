
-- Enable RLS on admin_login_attempts — all access goes through the service role key
-- in the edge function, so no client-facing policies are needed.
ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;

-- Deny all direct client access (service role bypasses RLS entirely)
CREATE POLICY "No direct client access"
  ON public.admin_login_attempts
  FOR ALL
  TO authenticated, anon
  USING (false);

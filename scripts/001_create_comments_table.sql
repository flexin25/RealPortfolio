-- Create comments table for portfolio contact form submissions
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a public comment system)
-- Allow anyone to insert comments (public can submit)
CREATE POLICY "comments_insert_public"
  ON public.comments FOR INSERT
  WITH CHECK (true);

-- Allow anyone to select comments (public can view)
CREATE POLICY "comments_select_public"
  ON public.comments FOR SELECT
  USING (true);

-- Only allow updates/deletes from authenticated admin users (for future admin panel)
-- For now, we'll create restrictive policies that can be updated later
CREATE POLICY "comments_update_admin_only"
  ON public.comments FOR UPDATE
  USING (false);

CREATE POLICY "comments_delete_admin_only"
  ON public.comments FOR DELETE
  USING (false);

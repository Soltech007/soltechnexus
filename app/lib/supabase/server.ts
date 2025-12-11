import { createClient } from '@supabase/supabase-js';

// Admin client with service role (for server-side operations)
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}

// Helper to get website ID
export function getWebsiteId() {
  return process.env.NEXT_PUBLIC_WEBSITE_ID || 'default';
}
"use client";

import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Direct client export
export const supabase = createSupabaseClient(supabaseUrl, supabaseAnonKey);

// Function export for compatibility
export const createClient = () => {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey);
};
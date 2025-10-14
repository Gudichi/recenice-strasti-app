import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

let _supabase: ReturnType<typeof createClient> | undefined;
let _supabaseAdmin: ReturnType<typeof createClient> | undefined;

export function getSupabaseClient() {
  if (!_supabase) {
    _supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true
      }
    });
  }
  return _supabase;
}

export function getSupabaseAdminClient() {
  if (!_supabaseAdmin) {
    _supabaseAdmin = createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    );
  }
  return _supabaseAdmin;
}

export const supabase = getSupabaseClient();
export const supabaseAdmin = getSupabaseAdminClient();

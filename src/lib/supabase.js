import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.NEXT_PUBLIC_SUPABASE_URL || '').trim();
const supabaseAnonKey = (import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '').trim();

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

console.info('[MJT Supabase] Configuration check', {
  urlExists: Boolean(supabaseUrl),
  anonKeyExists: Boolean(supabaseAnonKey),
});

if (!isSupabaseConfigured) {
  console.error(
    '[MJT Supabase] Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY. Inventory cannot load.',
  );
}

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey, {
      db: {
        schema: 'public',
      },
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;

export const whatsappNumber =
  (import.meta.env.VITE_WHATSAPP_NUMBER || import.meta.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '')
    .replace(/\D/g, '');

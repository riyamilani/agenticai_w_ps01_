import { createClient } from "@supabase/supabase-js";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function sanitizeSupabaseUrl(url) {
  if (!url) return null;
  try {
    const parsed = new URL(url);
    return parsed.origin;
  } catch {
    return url.replace(/\/rest\/v1\/?$/, "").replace(/\/+$/, "");
  }
}

const supabaseUrl = sanitizeSupabaseUrl(rawUrl);

const isConfigured =
  Boolean(supabaseUrl) &&
  Boolean(supabaseAnonKey) &&
  supabaseUrl.startsWith("https://") &&
  supabaseAnonKey.length > 20;

// Only create the client when real credentials are present.
// If placeholders are still in .env.local the app renders normally
// and components show appropriate states instead of crashing.
export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const supabaseReady = isConfigured;


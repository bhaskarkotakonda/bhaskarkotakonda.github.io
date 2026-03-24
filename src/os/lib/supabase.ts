import { createClient } from "@supabase/supabase-js";

// Connection values injected from Vercel/Process env
const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || process.env.PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || process.env.PUBLIC_SUPABASE_ANON_KEY || "";

// Standard unprivileged client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Admin client strictly for Secure API Routes (Cron, Webhooks, Protected SSR endpoints)
// Bypasses Row Level Security (RLS). Never expose this client to the browser window.
export const getSupabaseAdmin = () => {
  const serviceKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!serviceKey) {
    console.warn("⚠️ Missing SUPABASE_SERVICE_ROLE_KEY. Database admin rights will fail.");
    return createClient(supabaseUrl, "");
  }
  return createClient(supabaseUrl, serviceKey);
};

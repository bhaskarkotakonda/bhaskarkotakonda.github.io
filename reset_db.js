import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const sb = createClient(process.env.PUBLIC_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function fix() {
  await sb.from("Raw_Inbox").update({ processing_status: 'pending', retry_count: 0 }).eq('processing_status', 'failed');
  console.log("Reset failed items back to pending!");
}
fix();

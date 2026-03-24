import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log("Missing config keys.");
  process.exit(1);
}

const sb = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log("Checking Raw_Inbox...");
  const { data: inbox, error: e1 } = await sb.from("Raw_Inbox").select("*");
  console.log(inbox || e1);

  console.log("Checking Processed_Nodes...");
  const { data: nodes, error: e2 } = await sb.from("Processed_Nodes").select("*");
  console.log(nodes || e2);
}

check();

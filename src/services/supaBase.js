import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://unmmgfkmsibwjiuwpogt.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVubW1nZmttc2lid2ppdXdwb2d0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQyOTMzMDIsImV4cCI6MjA1OTg2OTMwMn0.vBzFErUDse3onc4dr-tDp3ufBoQRPIKMW5tLlrpYZV4";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;

import "expo-sqlite/localStorage/install";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://almreunaaebfjnrousgv.supabase.co"; 
const supabaseKey = "sb_publishable_BnJxVEtjcOvN-8X7MyQYWA_hIuh5Mja";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
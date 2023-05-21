import { createClient } from "@supabase/supabase-js";
import { Database } from "./database.types";

export const createSupabaseClient = createClient<Database>;

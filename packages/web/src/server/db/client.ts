import { env } from "@/env.mjs";
import { createSupabaseClient } from "@maple/db";

export const supabase = createSupabaseClient(
  env.SUPABASE_URL,
  env.SUPABASE_KEY
);

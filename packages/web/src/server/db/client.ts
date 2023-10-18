import { env } from "@/env.mjs";
import { createDrizzleClient, users, notes } from "@maple/db";

export * from "@maple/db";

export const db = createDrizzleClient({
  host: env.DB_HOST,
  username: env.DB_USERNAME,
  password: env.DB_PASSWORD,
});
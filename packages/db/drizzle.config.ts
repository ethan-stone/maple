import { Config } from "drizzle-kit";
import dotenv from "dotenv";

dotenv.config();

export default {
  schema: "./src/schema.ts",
  dbCredentials: {
    connectionString: process.env.DB_CONNECTION_STRING as string,
  },
  driver: "mysql2",
} satisfies Config;

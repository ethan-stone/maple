import * as schema from "./schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export * from "drizzle-orm";
export * from "./schema";

export function createDrizzleClient({
  host,
  username,
  password,
}: {
  host: string;
  username: string;
  password: string;
}) {
  const connection = connect({
    host,
    username,
    password,
  });

  return drizzle(connection, { schema });
}

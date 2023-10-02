import * as schema from "./schema";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";

export function createDrizzleClient(
  host: string,
  username: string,
  password: string
) {
  const connection = connect({
    host,
    username,
    password,
  });

  return drizzle(connection, { schema });
}

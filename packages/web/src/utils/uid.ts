import { ulid } from "ulid";

export function uid(args?: { prefix: string }) {
  let id = ulid();
  if (args?.prefix) {
    id = `${args.prefix}_${id}`;
  }

  return id;
}
import { env } from "@/env.mjs";
import { createPinoLogger, PinoLogger } from "@maple/logger";

const pino = createPinoLogger({
  level:
    env.NODE_ENV === "development"
      ? "debug"
      : env.NODE_ENV === "test"
      ? "silent"
      : "info",
  formatters: {
    level: (label) => {
      return {
        level: label.toUpperCase(),
      };
    },
  },
  mixin() {
    return {
      app: "web",
    };
  },
});

export const logger = new PinoLogger(pino);

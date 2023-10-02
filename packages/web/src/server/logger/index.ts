import { createLogger, format, transports } from "winston";

export const logger = createLogger({
  format: format.json(),
  defaultMeta: { service: "web" },
  transports: [
    new transports.Console({
      format: format.json(),
    }),
  ],
});

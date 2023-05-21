import { type Logger as LoggerFromPino, pino } from "pino";

export const createPinoLogger = pino;

type DebugArgs = {
  [key: string]: any;
};

type InfoArgs = {
  [key: string]: any;
};

type WarnArgs = {
  [key: string]: any;
};

type ErrorArgs = {
  [key: string]: any;
};

export interface ILogger {
  debug(message: string, args?: { [k: string]: any }): void;
  info(message: string, args?: { [k: string]: any }): void;
  warn(message: string, args?: { [k: string]: any }): void;
  error(message: string, args?: { [k: string]: any }): void;
}

type LoggerOptions = {
  baseLogArgs?: { [k: string]: any };
};

export class PinoLogger implements ILogger {
  constructor(private log: LoggerFromPino, private options?: LoggerOptions) {}

  private getLogArgs(args?: { [k: string]: any }) {
    return { ...args, ...this.options?.baseLogArgs };
  }

  debug(message: string, args?: DebugArgs) {
    this.log.debug(this.getLogArgs(args), message);
  }

  info(message: string, args?: InfoArgs) {
    this.log.info(this.getLogArgs(args), message);
  }

  warn(message: string, args?: WarnArgs) {
    this.log.warn(this.getLogArgs(args), message);
  }

  error(message: string, args?: ErrorArgs) {
    this.log.error(this.getLogArgs(args), message);
  }

  setOptions(options: LoggerOptions) {
    this.options = options;
  }
}

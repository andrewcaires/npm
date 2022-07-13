import { dateFormat, isUndefined } from "@andrewcaires/utils.js";

import { Logs } from "../models";

enum ColorLog {
  ERROR = "\x1b[31m",
  INFO = "\x1b[36m",
  NONE = "\x1b[37m",
  SUCCESS = "\x1b[32m",
  WARNING = "\x1b[33m",
}

type TypesLog = "error" | "info" | "success" | "warning" | "";

export class Log {

  static write(message: string, source?: string, console?: boolean) {

    Log.writeRaw(ColorLog.NONE, "", message, source, console);
  }

  static error(message: string, source?: string, console?: boolean) {

    Log.writeRaw(ColorLog.ERROR, "error", message, source, console);
  }

  static info(message: string, source?: string, console?: boolean) {

    Log.writeRaw(ColorLog.INFO, "info", message, source, console);
  }

  static success(message: string, source?: string, console?: boolean) {

    Log.writeRaw(ColorLog.ERROR, "success", message, source, console);
  }

  static warning(message: string, source?: string, console?: boolean) {

    Log.writeRaw(ColorLog.WARNING, "warning", message, source, console);
  }

  private static writeConsole(color: ColorLog, type: TypesLog, message: string) {

    const time = dateFormat(new Date, "%H:%M:%S");

    console.log(">", color, type + (" ").repeat(10 - type.length), "\x1b[37m", "|", time, "|", message);
  }

  private static writeRaw(color: ColorLog, type: TypesLog, message: string, source?: string, console?: boolean) {

    console = isUndefined(console) ? true : console;

    console && Log.writeConsole(color, type, message);

    Logs.create({ type, source, message }).catch(() => { return null; });
  }
}

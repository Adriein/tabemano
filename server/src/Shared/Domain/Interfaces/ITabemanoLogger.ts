import { LoggerService } from "@nestjs/common";
import { ErrorSerialization } from "Shared/Domain/constants";

export interface ITabemanoLogger extends LoggerService {
  debug(message: string, ...optionalParams: any[]): void

  error(error: ErrorSerialization[]): void

  log(message: string, ...optionalParams: any[]): void

  warn(message: string, ...optionalParams: any[]): void

  fatal(error: ErrorSerialization[]): void
}
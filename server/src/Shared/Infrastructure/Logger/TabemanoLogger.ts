import { ErrorSerialization } from "Shared/Domain/constants";
import { ITabemanoLogger } from "Shared/Domain/Interfaces/ITabemanoLogger";
import { Logger } from "tslog";

export class TabemanoLogger implements ITabemanoLogger {
  public constructor(private readonly tsLog: Logger<ErrorSerialization>) {}

  public debug(message: string, ...optionalParams: any[]): void {
    this.tsLog.debug(message, optionalParams);
  }

  public error(error: ErrorSerialization[]): void {
    this.tsLog.error(error);
  }

  public log(message: string, ...optionalParams: any[]): void {
    this.tsLog.log(1, message, optionalParams);
  }

  public warn(message: string, ...optionalParams: any[]): void {
    this.tsLog.warn(message, optionalParams);
  }

  public fatal(error: ErrorSerialization[]): void {
    this.tsLog.fatal(error);
  }
}
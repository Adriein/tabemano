import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "./DomainError";

export class DateFormatError extends DomainError {
  public errorCode = ErrorCode.DATA_FORMAT;

  constructor(wrongDate: Date | string) {
    super(`Date must have the format of YYYY-MM-DD, the passed date: ${wrongDate} is incorrect`);

    Object.setPrototypeOf(this, DateFormatError.prototype);
  }
}
import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "./DomainError";

export class UnexpectedError extends DomainError {
  public errorCode = ErrorCode.UNEXPECTED_ERROR;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }
}
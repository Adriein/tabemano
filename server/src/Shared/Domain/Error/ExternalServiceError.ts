import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

export class ExternalServiceError extends DomainError {
  public errorCode = ErrorCode.EXTERNAL_PROVIDER_ERROR;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }
}
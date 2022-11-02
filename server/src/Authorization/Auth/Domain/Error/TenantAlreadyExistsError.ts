import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

export class TenantAlreadyExistsError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor() {
    super('This tenant already exists');

    Object.setPrototypeOf(this, TenantAlreadyExistsError.prototype);
  }
}
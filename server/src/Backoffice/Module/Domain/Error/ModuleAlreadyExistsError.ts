import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";

export class ModuleAlreadyExistsError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor() {
    super('This module already exists');

    Object.setPrototypeOf(this, ModuleAlreadyExistsError.prototype);
  }
}
import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from './DomainError';

export class ModuleNotFoundError extends DomainError {
  public errorCode = ErrorCode.NOT_FOUND;

  constructor() {
    super('No module found with this criteria');

    Object.setPrototypeOf(this, ModuleNotFoundError.prototype);
  }
}

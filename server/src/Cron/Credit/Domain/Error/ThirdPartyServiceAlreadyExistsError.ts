import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from 'Shared/Domain/Error/DomainError';

export class ThirdPartyServiceAlreadyExistsError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor() {
    super('This third party service already exists');

    Object.setPrototypeOf(this, ThirdPartyServiceAlreadyExistsError.prototype);
  }
}

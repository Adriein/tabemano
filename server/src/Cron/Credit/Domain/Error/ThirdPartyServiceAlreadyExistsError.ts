import { DomainError } from 'Shared/Domain/Error/DomainError';

export class ThirdPartyServiceAlreadyExistsError extends DomainError {
  statusCode = 500;

  constructor() {
    super('This third party service already exists');

    Object.setPrototypeOf(this, ThirdPartyServiceAlreadyExistsError.prototype);
  }

  serialize() {
    return [{ message: this.message, key: 'third_party_service_already_exists_error' }];
  }
}

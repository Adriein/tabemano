import { DomainError } from "Shared/Domain/Error/DomainError";

export class TenantAlreadyExistsError extends DomainError {
  statusCode = 400;

  constructor() {
    super('This tenant already exists');

    Object.setPrototypeOf(this, TenantAlreadyExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'user_already_exists_error' } ];
  }
}
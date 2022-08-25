import { DomainError } from 'Shared/Domain/Error/DomainError';

export class NotAllowedError extends DomainError {
  statusCode = 401;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, NotAllowedError.prototype);
  }

  serialize() {
    return [{ message: this.message, key: 'not_allowed_error' }];
  }
}

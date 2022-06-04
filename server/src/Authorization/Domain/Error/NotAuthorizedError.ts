import { DomainError } from "Shared/Domain/Error/DomainError";


export class NotAuthorizedError extends DomainError {
  statusCode = 401;

  constructor() {
    super('Not Authorized');

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serialize() {
    return [ { message: 'Not authorized', key: 'not_authorized_error' } ];
  }
}
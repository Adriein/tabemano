import { DomainError } from "Shared/Domain/Error/DomainError";

export class RecordNotFoundError extends DomainError {
  statusCode = 400;

  constructor() {
    super('No record found with this criteria');

    Object.setPrototypeOf(this, RecordNotFoundError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
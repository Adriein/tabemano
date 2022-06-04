import { DomainError } from "./DomainError";

export class NumberFormatError extends DomainError {
  statusCode = 400;

  constructor() {
    super('Must be a number');

    Object.setPrototypeOf(this, NumberFormatError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
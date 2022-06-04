import { DomainError } from "./DomainError";

export class StringFormatError extends DomainError {
  statusCode = 400;

  constructor() {
    super('Must be a string');

    Object.setPrototypeOf(this, StringFormatError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
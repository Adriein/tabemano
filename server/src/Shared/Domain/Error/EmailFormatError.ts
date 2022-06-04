import { DomainError } from "./DomainError";

export class EmailFormatError extends DomainError {
  statusCode = 400;

  constructor() {
    super('Email must have the correct format');

    Object.setPrototypeOf(this, EmailFormatError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
import { DomainError } from "./DomainError";

export class UnexpectedError extends DomainError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, UnexpectedError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'unexpected_error' } ];
  }
}
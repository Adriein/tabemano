import { DomainError } from "Shared/Domain/Error/DomainError";

export class FilterError extends DomainError {
  statusCode = 400;

  constructor(msg: string) {
    super(msg);

    Object.setPrototypeOf(this, FilterError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
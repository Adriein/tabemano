import { DomainError } from "./DomainError";

export class DateFormatError extends DomainError {
  statusCode = 400;

  constructor(wrongDate: Date | string) {
    super(`Date must have the format of YYYY-MM-DD, the passed date: ${wrongDate} is incorrect`);

    Object.setPrototypeOf(this, DateFormatError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'last_payment_date_error' } ];
  }
}
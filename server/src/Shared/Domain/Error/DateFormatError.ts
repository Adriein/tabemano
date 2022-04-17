import { CustomError } from "./CustomError";

export class DateFormatError extends CustomError {
  statusCode = 400;

  constructor() {
    super('Date must have the format of YYYY-MM-DD');

    Object.setPrototypeOf(this, DateFormatError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'last_payment_date_error' } ];
  }
}
import { CustomError } from "Shared/Domain/Error/CustomError";

export class RecordNotFoundError extends CustomError {
  statusCode = 400;

  constructor() {
    super('No record found with this criteria');

    Object.setPrototypeOf(this, RecordNotFoundError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'email_format_error' } ];
  }
}
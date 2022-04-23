import { CustomError } from "Shared/Domain/Error/CustomError";

export class TenantAlreadyExistsError extends CustomError {
  statusCode = 400;

  constructor() {
    super('This tenant already exists');

    Object.setPrototypeOf(this, TenantAlreadyExistsError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: 'user_already_exists_error' } ];
  }
}
import { DomainError } from "Shared/Domain/Error/DomainError";

export class ExternalServiceError extends DomainError {
  statusCode = 400;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, ExternalServiceError.prototype);
  }

  serialize() {
    return [ { message: this.message, key: '' } ];
  }
}
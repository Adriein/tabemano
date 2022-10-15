import { DomainError } from "Shared/Domain/Error/DomainError";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";

export class CompanyAlreadyRegisteredError extends DomainError {
  public statusCode = 400;

  constructor(fiscalId: FiscalId) {
    super(`Company with fiscalId: ${fiscalId.value} is already registered`);

    Object.setPrototypeOf(this, CompanyAlreadyRegisteredError.prototype);
  }

  public serialize(): { message: string; key: string }[] {
    return [ { message: this.message, key: 'last_payment_date_error' } ];
  }
}
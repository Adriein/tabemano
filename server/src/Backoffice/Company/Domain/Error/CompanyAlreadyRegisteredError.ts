import { ErrorCode } from "Shared/Domain/constants";
import { DomainError } from "Shared/Domain/Error/DomainError";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";

export class CompanyAlreadyRegisteredError extends DomainError {
  public errorCode = ErrorCode.APPLICATION_ERROR;

  constructor(fiscalId: FiscalId) {
    super(`Company with fiscalId: ${fiscalId.value} is already registered`);

    Object.setPrototypeOf(this, CompanyAlreadyRegisteredError.prototype);
  }
}
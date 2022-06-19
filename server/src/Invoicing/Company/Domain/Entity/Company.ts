import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Company extends Aggregate {
  constructor(
    readonly id: ID,
    readonly name: CompanyName,
    readonly fiscalId: FiscalId,
    readonly address: Address,
    readonly phone: Phone,
    readonly type: CompanyType
  ) {
    super(id);
  }
}
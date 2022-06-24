import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Country } from "Invoicing/Company/Domain/Vo/Country";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Company {
  constructor(
    readonly id: ID,
    readonly name: CompanyName,
    readonly fiscalId: FiscalId,
    readonly address: Address,
    readonly phone: Phone,
    readonly type: CompanyType,
    readonly country: Country
  ) {}
}
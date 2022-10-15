import { Address } from "Shared/Domain/Vo/Address.vo";
import { CompanyName } from "Shared/Domain/Vo/CompanyName.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
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
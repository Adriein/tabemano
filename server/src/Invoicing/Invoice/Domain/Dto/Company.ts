import { FindCompanyResponse } from "Invoicing/Company/Application/FindCompany/FindCompanyResponse";
import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Country } from "Invoicing/Company/Domain/Vo/Country";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Company {
  public static fromQuery(response: FindCompanyResponse): Company {
    const id = new ID(response.id);
    const name = new CompanyName(response.name);
    const fiscalId = new FiscalId(response.fiscalId);
    const address = new Address(response.address);
    const phone = new Phone(response.phone);
    const type = new CompanyType(response.type);
    const country = new CompanyType(response.country);


    return new Company(id, name, fiscalId, address, phone, type, country);
  }

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
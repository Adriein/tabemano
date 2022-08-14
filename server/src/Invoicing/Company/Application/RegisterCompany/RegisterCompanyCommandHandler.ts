import { ICommandHandler } from "@nestjs/cqrs";
import { RegisterCompanyCommand } from "Invoicing/Company/Application/RegisterCompany/RegisterCompanyCommand";
import { Company } from "Invoicing/Company/Domain/Entity/Company";
import { CompanyAlreadyRegisteredError } from "Invoicing/Company/Domain/Error/CompanyAlreadyRegisteredError";
import { CompanyFilter } from "Invoicing/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Invoicing/Company/Domain/Repository/ICompanyRepository";
import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class RegisterCompanyCommandHandler implements ICommandHandler {
  constructor(private readonly repository: ICompanyRepository) {}

  public async execute(command: RegisterCompanyCommand): Promise<void> {
    const name = new CompanyName(command.name);
    const fiscalId = new FiscalId(command.fiscalId);
    const address = new Address(command.address);
    const phone = new Phone(command.phone);
    const type = new CompanyType(command.type);
    const country = new CompanyType(command.country);

    await this.ensureCompanyIsNotRegistered(fiscalId);

    const company = Company.build(name, fiscalId, address, phone, type, country);

    await this.repository.save(company);
  }

  private async ensureCompanyIsNotRegistered(fiscalId: FiscalId): Promise<void> {
    const filter = CompanyFilter.create().withFiscalId(fiscalId);

    const result = await this.repository.find(filter);

    const companies = result.unwrap();

    if (companies.length) {
      throw new CompanyAlreadyRegisteredError(fiscalId);
    }
  }
}
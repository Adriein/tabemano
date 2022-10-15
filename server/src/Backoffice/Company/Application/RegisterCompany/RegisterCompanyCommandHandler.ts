import { Inject } from "@nestjs/common";
import { ICommandHandler } from "@nestjs/cqrs";
import { RegisterCompanyCommand } from "Backoffice/Company/Application/RegisterCompany/RegisterCompanyCommand";
import { Company } from "Backoffice/Company/Domain/Entity/Company";
import { CompanyAlreadyRegisteredError } from "Backoffice/Company/Domain/Error/CompanyAlreadyRegisteredError";
import { CompanyFilter } from "Backoffice/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Backoffice/Company/Domain/Repository/ICompanyRepository";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { CompanyName } from "Shared/Domain/Vo/CompanyName.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class RegisterCompanyCommandHandler implements ICommandHandler {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: ICompanyRepository
  ) {}

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

    const result = await this.repository.findOne(filter);

    if (result.isOk) {
      throw new CompanyAlreadyRegisteredError(fiscalId);
    }
  }
}
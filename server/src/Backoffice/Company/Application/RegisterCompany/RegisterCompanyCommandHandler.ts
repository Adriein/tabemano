import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { CompanyRegisteredDomainEvent } from "Backoffice/Company/Application/RegisterCompany/CompanyRegisteredDomainEvent";
import { RegisterCompanyCommand } from "Backoffice/Company/Application/RegisterCompany/RegisterCompanyCommand";
import { Company } from "Backoffice/Company/Domain/Entity/Company";
import { CompanyAlreadyRegisteredError } from "Backoffice/Company/Domain/Error/CompanyAlreadyRegisteredError";
import { CompanyFilter } from "Backoffice/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Backoffice/Company/Domain/Repository/ICompanyRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { City } from "Shared/Domain/Vo/City.vo";
import { CompanyName } from "Shared/Domain/Vo/CompanyName.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";
import { State } from "Shared/Domain/Vo/State.vo";

@CommandHandler(RegisterCompanyCommand)
export class RegisterCompanyCommandHandler implements ICommandHandler {
  constructor(
    @Inject('ICompanyRepository')
    private readonly repository: ICompanyRepository,
    private readonly eventBus: EventBus,
  ) {}

  @Log()
  public async execute(command: RegisterCompanyCommand): Promise<void> {
    const name = new CompanyName(command.name);
    const fiscalId = new FiscalId(command.fiscalId);
    const address = new Address(command.address);
    const phone = new Phone(command.phone);
    const type = new CompanyType(command.type);
    const country = new CompanyType(command.country);
    const state = new State(command.state);
    const city = new City(command.city);
    const tenantId = new ID(command.tenantId);

    await this.ensureCompanyIsNotRegistered(fiscalId);

    const company = Company.build(name, fiscalId, address, phone, type, country, state, city);

    await this.repository.save(company);

    this.eventBus.publish(new CompanyRegisteredDomainEvent(company.id(), tenantId))
  }

  private async ensureCompanyIsNotRegistered(fiscalId: FiscalId): Promise<void> {
    const filter = CompanyFilter.create().withFiscalId(fiscalId);

    const result = await this.repository.findOne(filter);

    if (result.isOk) {
      throw new CompanyAlreadyRegisteredError(fiscalId);
    }
  }
}
import { Inject } from "@nestjs/common";
import { EventsHandler } from "@nestjs/cqrs";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IThirdPartySmtpServiceAbstractFactory } from "Backoffice/Notification/Domain/Factory/IThirdPartySmtpServiceAbstractFactory";
import { ITenantRepository } from "Backoffice/Notification/Domain/Repository/ITenantRepository";
import { IVerifyTenantEmailService } from "Backoffice/Notification/Domain/Service/IVerifyTenantEmailService";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { TenantCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/TenantCreatedDomainEvent";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class VerifyTenantEmailDomainEventHandler implements IDomainEventHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly repository: ITenantRepository,
    @Inject('IThirdPartySmtpServiceAbstractFactory')
    private readonly factory: IThirdPartySmtpServiceAbstractFactory
  ) {}

  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    try {
      const tenant = await this.findTenant(event.aggregateId);

      const service = this.getVerifyEmailService();

      await tenant.verifyEmail(service);
    } catch (error: any) {
      console.log(error.serialize())
    }
  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }

  private getVerifyEmailService(): IVerifyTenantEmailService {
    return this.factory.createVerifyTenantEmailService();
  }
}
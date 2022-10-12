import { EventsHandler } from "@nestjs/cqrs";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IThirdPartySmtpServiceAbstractFactory } from "Backoffice/Notification/Domain/Factory/IThirdPartySmtpServiceAbstractFactory";
import { ITenantRepository } from "Backoffice/Notification/Domain/Repository/ITenantRepository";
import { IVerifyTenantEmailService } from "Backoffice/Notification/Domain/Service/IVerifyTenantEmailService";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { TenantConfiguredDomainEvent } from "Backoffice/Tenant/Application/ConfigureTenant/TenantConfiguredDomainEvent";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(TenantConfiguredDomainEvent)
export class VerifyTenantEmailDomainEventHandler implements IDomainEventHandler {
  constructor(
    private readonly repository: ITenantRepository,
    private readonly factory: IThirdPartySmtpServiceAbstractFactory
  ) {}

  public async handle(event: TenantConfiguredDomainEvent): Promise<void> {
    const tenant = await this.findTenant(event.aggregateId);

    const service = this.getVerifyEmailService();

    await tenant.verifyEmail(service);
  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withTenantId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }

  private getVerifyEmailService(): IVerifyTenantEmailService {
    return this.factory.createVerifyTenantEmailService();
  }
}
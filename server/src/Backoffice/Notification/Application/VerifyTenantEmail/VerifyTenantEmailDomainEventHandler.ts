import { Inject } from "@nestjs/common";
import { EventsHandler } from "@nestjs/cqrs";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IThirdPartySmtpServiceAbstractFactory } from "Backoffice/Notification/Domain/Factory/IThirdPartySmtpServiceAbstractFactory";
import { ITenantRepository } from "Backoffice/Notification/Domain/Repository/ITenantRepository";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { TenantCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/TenantCreatedDomainEvent";
import { Log } from "Shared/Domain/Decorators/Log";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { FailOverService } from "Shared/Domain/Services/FailOverService";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(TenantCreatedDomainEvent)
export class VerifyTenantEmailDomainEventHandler implements IDomainEventHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly repository: ITenantRepository,
    @Inject('IThirdPartySmtpServiceAbstractFactory')
    private readonly factory: IThirdPartySmtpServiceAbstractFactory,
    private readonly failOverService: FailOverService
  ) {}

  @Log()
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    try {
      const tenant = await this.findTenant(event.aggregateId);

      const service = this.getSmtpService();

      await tenant.verifyEmail(service);
    } catch (error) {
      await this.failOverService.execute(event, error as Error);
    }
  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }

  private getSmtpService(): ISmtpService {
    return this.factory.createSmtpService();
  }
}
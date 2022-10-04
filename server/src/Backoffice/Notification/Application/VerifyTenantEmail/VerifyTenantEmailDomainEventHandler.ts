import { EventsHandler } from "@nestjs/cqrs";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { ITenantRepository } from "Backoffice/Notification/Domain/Repository/ITenantRepository";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { TenantCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/TenantCreatedDomainEvent";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { IRestService } from "Shared/Domain/Services/IRestService";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(TenantCreatedDomainEvent)
export class VerifyTenantEmailDomainEventHandler implements IDomainEventHandler {
  constructor(
    private readonly repository: ITenantRepository,
    private readonly restService: IRestService
  ) {}

  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    const tenant = await this.findTenant(event.aggregateId);

    await tenant.verifyEmailOnSmtpProvider(this.restService);
  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withTenantId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
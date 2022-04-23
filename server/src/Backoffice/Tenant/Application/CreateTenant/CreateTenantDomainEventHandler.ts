import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Entities/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "Shared/Domain/Decorators/Log";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";

@DomainEventsHandler(TenantCreatedDomainEvent)
export class CreateTenantDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: ITenantRepository) {}

  @Log()
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    const { name, email, password, roleId } = event;
    const tenant = Tenant.build(name, password, email, ID.generate(), roleId);

    await this.repository.save(tenant);
  }
}
import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TenantRegisteredDomainEvent } from "Authorization/Auth/Application/RegisterTenant/TenantRegisteredDomainEvent";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { Log } from "Shared/Domain/Decorators/Log";
import { FailOverService } from "Shared/Domain/Services/FailOverService";

@EventsHandler(TenantRegisteredDomainEvent)
export class CreateTenantDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly tenantRepository: ITenantRepository,
    private readonly failOverService: FailOverService
  ) {}

  @Log()
  public async handle(event: TenantRegisteredDomainEvent): Promise<void> {
    try {
      const { name, email, password, roleId } = event;

      const tenant = Tenant.build(name, password, email, roleId);

      await this.tenantRepository.save(tenant);

      tenant.commit();
    } catch (error) {
      await this.failOverService.execute(event, error as Error);
    }
  }
}
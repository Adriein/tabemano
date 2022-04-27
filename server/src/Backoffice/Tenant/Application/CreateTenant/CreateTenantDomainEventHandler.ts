import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Entities/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { Roles } from "Shared/Domain/constants";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "Shared/Domain/Decorators/Log";
import { DomainEventsManager } from "Shared/Domain/Entities/DomainEventsManager";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@DomainEventsHandler(TenantCreatedDomainEvent)
export class CreateTenantDomainEventHandler implements IDomainEventHandler {
  constructor(
    private readonly tenantRepository: ITenantRepository,
  ) {}

  @Log()
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    const { name, email, password, roleId } = event;

    const admin = await this.findAdmin();

    const pricing = admin.getYearlyPricing();

    const tenant = Tenant.build(name, password, email, admin.id(), roleId);

    const subscription = tenant.createSubscription(pricing);

    await this.tenantRepository.save(tenant);

    //await this.subscriptionRepository.save(subscription);

    await DomainEventsManager.publishEvents(tenant.id())
  }

  private async findAdmin(): Promise<Tenant> {
    const filter = new UserFilter();
    filter.withRole(new RoleType(Roles.ADMIN));

    const result = await this.tenantRepository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
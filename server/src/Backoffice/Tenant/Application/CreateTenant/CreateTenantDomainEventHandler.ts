import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { TenantRegisteredDomainEvent } from "Authorization/Auth/Application/RegisterTenant/TenantRegisteredDomainEvent";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { Roles } from "Shared/Domain/constants";
import { Log } from "Shared/Domain/Decorators/Log";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@EventsHandler(TenantRegisteredDomainEvent)
export class CreateTenantDomainEventHandler implements IEventHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly tenantRepository: ITenantRepository,
    @Inject('ISubscriptionRepository')
    private readonly subscriptionRepository: ISubscriptionRepository,
  ) {}

  @Log()
  public async handle(event: TenantRegisteredDomainEvent): Promise<void> {
    const { name, email, password, roleId } = event;

    const admin = await this.findAdmin();

    const pricing = admin.getYearlyPricing();

    const tenant = Tenant.build(name, password, email, roleId);

    const subscription = tenant.createSubscription(pricing);

    await this.tenantRepository.save(tenant);
    
    await this.subscriptionRepository.save(subscription);

    tenant.commit();
  }

  private async findAdmin(): Promise<Tenant> {
    const filter = new UserFilter();
    filter.withRole(new RoleType(Roles.ADMIN));

    const result = await this.tenantRepository.findOne(filter);

    return result.unwrap();
  }
}
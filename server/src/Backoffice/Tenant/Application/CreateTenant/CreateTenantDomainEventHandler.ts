import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { PricingVo } from "Backoffice/Shared/Domain/Vo/PricingVo";
import { YEARLY_PRICING } from "Backoffice/Tenant/Domain/constants";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Entities/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { Roles } from "Shared/Domain/constants";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "Shared/Domain/Decorators/Log";
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

    const pricing = admin.getYearlyPricingVo();

    const tenant = Tenant.build(name, password, email, admin.id(), roleId);

    const subscription = tenant.createSubscription(pricing.id, pricing.duration);

    //await this.tenantRepository.save(tenant);

    //await this.subscriptionRepository.save(subscription);
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
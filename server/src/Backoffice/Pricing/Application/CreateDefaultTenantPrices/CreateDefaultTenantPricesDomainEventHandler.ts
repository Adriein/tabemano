import { IPricingRepository } from "Backoffice/Pricing/Domain/Entities/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entities/Pricing";
import { MONTHLY_PRICING, QUARTERLY_PRICING } from "Backoffice/Shared/constants";
import { DefaultPricesCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/DefaultPricesCreatedDomainEvent";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";

@DomainEventsHandler(DefaultPricesCreatedDomainEvent)
export class CreateDefaultTenantPricesDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: IPricingRepository) {}

  public async handle(event: DefaultPricesCreatedDomainEvent): Promise<void> {
    const monthlyPricing = Pricing.build(MONTHLY_PRICING, 30, 50, event.aggregateId);
    const quarterlyPricing = Pricing.build(QUARTERLY_PRICING, 90, 150, event.aggregateId);

    await this.repository.save(monthlyPricing);
    await this.repository.save(quarterlyPricing);
  }

}
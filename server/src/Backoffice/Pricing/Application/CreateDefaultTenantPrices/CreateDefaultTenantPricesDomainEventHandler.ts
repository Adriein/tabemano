import { IPricingRepository } from "Backoffice/Pricing/Domain/Entities/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entities/Pricing";
import { DefaultPricesCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/DefaultPricesCreatedDomainEvent";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";

@DomainEventsHandler(DefaultPricesCreatedDomainEvent)
export class CreateDefaultTenantPricesDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: IPricingRepository) {}

  public async handle(event: DefaultPricesCreatedDomainEvent): Promise<void> {
    const monthlyPricing = Pricing.monthly(event.aggregateId);
    const quarterlyPricing = Pricing.quarterly(event.aggregateId);

    await this.repository.save(monthlyPricing);
    await this.repository.save(quarterlyPricing);
  }

}
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { DefaultPricesCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/DefaultPricesCreatedDomainEvent";
import { Log } from "Shared/Domain/Decorators/Log";

@EventsHandler(DefaultPricesCreatedDomainEvent)
export class CreateDefaultTenantPricesDomainEventHandler implements IEventHandler {
  constructor(private readonly repository: IPricingRepository) {}

  @Log()
  public async handle(event: DefaultPricesCreatedDomainEvent): Promise<void> {
    const monthlyPricing = Pricing.monthly(event.aggregateId);
    const quarterlyPricing = Pricing.quarterly(event.aggregateId);

    await this.repository.save(monthlyPricing);
    await this.repository.save(quarterlyPricing);
  }

}
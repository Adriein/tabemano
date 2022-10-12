import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { TenantCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/TenantCreatedDomainEvent";
import { Log } from "Shared/Domain/Decorators/Log";
import { UnexpectedError } from "Shared/Domain/Error/UnexpectedError";

@EventsHandler(TenantCreatedDomainEvent)
export class CreateDefaultTenantPricesDomainEventHandler implements IEventHandler {
  constructor(@Inject('IPricingRepository') private readonly repository: IPricingRepository) {}

  @Log()
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    try {
      const monthlyPricing = Pricing.monthly(event.aggregateId);
      const quarterlyPricing = Pricing.quarterly(event.aggregateId);

      await this.repository.save(monthlyPricing);
      await this.repository.save(quarterlyPricing);
    } catch (error: any) {
      throw new UnexpectedError(error.message);
    }
  }
}
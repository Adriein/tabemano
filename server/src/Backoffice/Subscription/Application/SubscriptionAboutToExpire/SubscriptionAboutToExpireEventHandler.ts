import { Inject } from "@nestjs/common";
import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { SubscriptionAboutToExpireDomainEvent } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionAboutToExpireDomainEvent";
import { FailOverService } from "Shared/Domain/Services/FailOverService";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(SubscriptionAboutToExpireDomainEvent)
export class SubscriptionAboutToExpireEventHandler implements IEventHandler {
  constructor(
    @Inject('ISubscriptionRepository')
    private readonly repository: ISubscriptionRepository,
    private readonly failOverService: FailOverService
  ) {}

  public async handle(event: SubscriptionAboutToExpireDomainEvent): Promise<void> {
    try {
      const subscription = await this.getActiveSubscription(event.aggregateId);

      subscription.makeAboutToExpire();

      await this.repository.update(subscription);
    } catch (error) {
      await this.failOverService.execute(event, error as Error)
    }
  }

  private async getActiveSubscription(id: ID): Promise<Subscription> {
    const filter = SubscriptionFilter
      .create()
      .isActive(true)
      .withId(id);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
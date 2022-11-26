import { EventsHandler, IEventHandler } from "@nestjs/cqrs";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { SubscriptionExpired } from "Cron/Client/Application/CheckExpiredSubscriptions/SubscriptionExpired";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(SubscriptionExpired)
export class SubscriptionExpiredEventHandler implements IEventHandler {
  constructor(private readonly repository: ISubscriptionRepository) {}

  public async handle(event: SubscriptionExpired): Promise<void> {
    const subscription = await this.getActiveSubscription(event.subscriptionId());

    subscription.makeExpired();

    await this.repository.update(subscription);
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
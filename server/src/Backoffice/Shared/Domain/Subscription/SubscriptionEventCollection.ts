import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { Collection } from "Shared/Domain/Entities/Collection";
import { SUBSCRIPTION_STATUS } from "../../constants";


export class SubscriptionEventCollection extends Collection<SubscriptionEvent> {
  public static build(historyList: SubscriptionEvent[]): SubscriptionEventCollection {
    return new SubscriptionEventCollection(historyList);
  }

  constructor(data: SubscriptionEvent[]) {
    super(data);
  }

  public containsEvent(event: SUBSCRIPTION_STATUS): boolean {
    return !!this.data()
      .find((history: SubscriptionEvent) => history.event() === event);
  }
}
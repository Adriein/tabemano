import { ID } from "Shared/Domain/Vo/Id.vo";
import { SUBSCRIPTION_STATUS } from "../../constants";

export class SubscriptionEvent {
  public static build(event: SUBSCRIPTION_STATUS, subscriptionId: ID): SubscriptionEvent {
    return new SubscriptionEvent(ID.generate(), event, subscriptionId, new Date(), new Date());
  }

  constructor(
    readonly id: ID,
    readonly event: SUBSCRIPTION_STATUS,
    readonly subscriptionId: ID,
    readonly createdAt: Date,
    readonly updatedAt: Date
  ) {}
}
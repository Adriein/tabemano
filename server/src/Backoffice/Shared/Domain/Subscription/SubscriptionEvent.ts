import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { SUBSCRIPTION_STATUS } from "../../constants";

export class SubscriptionEvent extends BaseEntity {
  public static build(event: SUBSCRIPTION_STATUS, subscriptionId: ID): SubscriptionEvent {
    return new SubscriptionEvent(ID.generate(), event, subscriptionId, new Date(), new Date());
  }

  constructor(
    _id: ID,
    private _event: SUBSCRIPTION_STATUS,
    private _subscriptionId: ID,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public event(): SUBSCRIPTION_STATUS {
    return this._event;
  }

  public subscriptionId(): ID {
    return this._subscriptionId;
  }
}
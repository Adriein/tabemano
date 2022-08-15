import { IEvent } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class SubscriptionExpired implements IEvent {
  constructor(
    private _subscriptionId: ID
  ) {}


  public get subscriptionId(): ID {
    return this._subscriptionId;
  }
}
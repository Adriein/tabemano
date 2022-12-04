import { IEvent } from "@nestjs/cqrs";
import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class SubscriptionExpired extends DomainEvent implements IEvent {
  protected readonly _type: string = 'tabemano.cron.1.event.client.subscription-expired';

  constructor(
    protected _aggregateId: ID,
    private _subscriptionId: ID,
  ) {
    super();
  }

  public type(): string {
    return this._type;
  }

  public clientId(): ID {
    return this._aggregateId;
  }

  public subscriptionId(): ID {
    return this._subscriptionId;
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id.value,
      dateOccurred: this.dateOccurred.value,
      aggregateId: this._aggregateId.value,
      subscriptionId: this._subscriptionId.value,
      type: this._type,
    });
  }
}
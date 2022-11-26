import { IEvent } from "@nestjs/cqrs";
import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class SubscriptionExpired extends DomainEvent implements IEvent {
  protected readonly _type: string = 'tabemano.cron.1.event.client.subscription-expired';

  constructor(
    protected _aggregateId: ID
  ) {
    super();
  }

  public type(): string {
    return this._type;
  }

  public clientId(): ID {
    return this._aggregateId;
  }

}
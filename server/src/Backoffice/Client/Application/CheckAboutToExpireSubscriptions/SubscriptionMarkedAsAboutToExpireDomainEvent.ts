import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";


export class SubscriptionMarkedAsAboutToExpireDomainEvent extends DomainEvent {
  constructor(
    protected readonly _aggregateId: ID,
    private readonly _clientId: ID,
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }
  
  public get clientId(): ID {
    return this._clientId;
  }
}
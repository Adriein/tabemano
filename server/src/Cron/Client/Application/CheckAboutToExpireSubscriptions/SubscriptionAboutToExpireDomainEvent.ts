import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class SubscriptionAboutToExpireDomainEvent extends DomainEvent {
  protected _type = 'tabemano.cron.1.event.subscription.expired';

  constructor(protected readonly _aggregateId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }
}

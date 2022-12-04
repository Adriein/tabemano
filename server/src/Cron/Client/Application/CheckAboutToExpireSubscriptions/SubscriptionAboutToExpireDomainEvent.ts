import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class SubscriptionAboutToExpireDomainEvent extends DomainEvent {
  protected _type = 'tabemano.cron.1.event.client.expired';

  constructor(protected readonly _aggregateId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  serialize(): string {
    return JSON.stringify({
      id: this.id.value,
      dateOccurred: this.dateOccurred.value,
      aggregateId: this._aggregateId.value,
      type: this._type
    });
  }
}

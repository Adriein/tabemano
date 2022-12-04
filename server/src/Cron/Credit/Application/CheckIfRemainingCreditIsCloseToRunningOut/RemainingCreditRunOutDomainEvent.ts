import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class RemainingCreditRunOutDomainEvent extends DomainEvent {
  protected _type = 'tabemano.cron.1.event.credit.expired';

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _thirdPartyServiceName: Name,
    private readonly _creditsLeftBeforeNotifying: number
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get thirdPartyServiceName(): Name {
    return this._thirdPartyServiceName;
  }

  public get creditsLeftBeforeNotifying(): number {
    return this._creditsLeftBeforeNotifying;
  }

  public get type(): string {
    return this._type;
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id.value,
      dateOccurred: this.dateOccurred.value,
      aggregateId: this._aggregateId.value,
      thirdPartyServiceName: this._thirdPartyServiceName.value,
      creditsLeftBeforeNotifying: this._creditsLeftBeforeNotifying,
      type: this._type
    });
  }
}

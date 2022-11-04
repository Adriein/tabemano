import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class RemainingCreditRunOutDomainEvent extends DomainEvent {
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
}
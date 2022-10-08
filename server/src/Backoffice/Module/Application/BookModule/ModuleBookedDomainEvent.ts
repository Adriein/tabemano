import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class ModuleBookedDomainEvent extends DomainEvent {
  constructor(
    protected readonly _aggregateId: ID,
    private readonly _tenantId: ID,
    private readonly _moduleId: ID
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get tenantId(): ID {
    return this._tenantId;
  }

  public get moduleId(): ID {
    return this._moduleId;
  }
}

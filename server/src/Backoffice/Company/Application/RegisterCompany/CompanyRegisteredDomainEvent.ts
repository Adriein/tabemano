import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class CompanyRegisteredDomainEvent extends DomainEvent {
  constructor(protected readonly _aggregateId: ID, private readonly _tenantId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }
  
  public get tenantId(): ID {
    return this._tenantId;
  }
}
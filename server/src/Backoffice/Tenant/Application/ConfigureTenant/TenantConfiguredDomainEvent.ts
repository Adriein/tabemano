import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class TenantConfiguredDomainEvent extends DomainEvent {
  constructor(protected readonly _aggregateId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }
}
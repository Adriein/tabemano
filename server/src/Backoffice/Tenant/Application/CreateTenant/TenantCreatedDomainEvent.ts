import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class TenantCreatedDomainEvent extends DomainEvent {
  protected _type= 'tabemano.backoffice.1.event.tenant.created';

  constructor(protected readonly _aggregateId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }
}
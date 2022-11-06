import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class CompanyRegisteredDomainEvent extends DomainEvent {
  protected _type = 'tabemano.backoffice.1.event.company.created';

  constructor(protected readonly _aggregateId: ID, private readonly _tenantId: ID) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get tenantId(): ID {
    return this._tenantId;
  }

  public get type(): string {
    return this._type;
  }
}
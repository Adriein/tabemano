import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class Permission extends AggregateRoot {
  public static build(tenantId: ID, moduleId: ID): Permission {
    return new Permission(ID.generate(), tenantId, moduleId);
  }
  
  constructor(_id: ID, private _tenantId: ID, private _moduleId: ID) {
    super(_id);
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public moduleId(): ID {
    return this._moduleId;
  }
}

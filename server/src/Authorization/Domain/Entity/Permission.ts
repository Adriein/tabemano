import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class Permission extends AggregateRoot {
  public static build(tenantId: ID, moduleId: ID, name: Name): Permission {
    return new Permission(ID.generate(), tenantId, moduleId, name);
  }

  constructor(_id: ID, private _tenantId: ID, private _moduleId: ID, private _name: Name) {
    super(_id);
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public moduleId(): ID {
    return this._moduleId;
  }

  public name(): Name {
    return this._name;
  }
}

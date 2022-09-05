import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class Permission extends AggregateRoot {
  public static build(tenantId: ID, moduleId: ID, moduleName: Name, modulePath: Name): Permission {
    return new Permission(ID.generate(), tenantId, moduleId, moduleName, modulePath);
  }

  constructor(
    _id: ID,
    private _tenantId: ID,
    private _moduleId: ID,
    private _moduleName: Name,
    private _modulePath: Name
  ) {
    super(_id);
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public moduleId(): ID {
    return this._moduleId;
  }

  public moduleName(): Name {
    return this._moduleName;
  }

  public modulePath(): Name {
    return this._modulePath;
  }
}

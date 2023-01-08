import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';

export class Permission extends AggregateRoot {
  public static build(tenantId: ID, moduleId: ID, moduleName: Name, moduleUrl: Url[]): Permission {
    return new Permission(
      ID.generate(),
      tenantId,
      moduleId,
      moduleName,
      moduleUrl,
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _tenantId: ID,
    private _moduleId: ID,
    private _productName: Name,
    private _productId: Url[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id);
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public productId(): ID {
    return this._moduleId;
  }

  public productName(): Name {
    return this._productName;
  }

  public moduleUrl(): Url[] {
    return this._productId;
  }
}

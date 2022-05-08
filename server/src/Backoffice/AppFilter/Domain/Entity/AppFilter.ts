import { FilterableField } from "Backoffice/AppFilter/Domain/Entity/FilterableField";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppFilter extends AggregateRoot {
  public static build(tenantId: ID, entity: string): AppFilter {
    return new AppFilter(
      ID.generate(),
      tenantId,
      entity,
      [],
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _tenantId: ID,
    private _entity: string,
    private _field: FilterableField[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public tenantId(): ID {
    return this._tenantId;
  }

  public entity(): string {
    return this._entity;
  }

  public field(): FilterableField[] {
    return this._field;
  }
}
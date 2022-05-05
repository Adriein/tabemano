import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class Role extends AggregateRoot {
  public static build(type: RoleType): Role {
    return new Role(ID.generate(), type)
  }

  constructor(
    _id: ID,
    private _type: RoleType,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public type(): RoleType {
    return this._type;
  }
}
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class Role extends AggregateRoot {
  public static build(type: RoleType): Role {
    return new Role(ID.generate(), type)
  }

  constructor(
    _id: ID,
    private readonly _type: RoleType,
  ) {
    super(_id);
  }

  public type(): RoleType {
    return this._type;
  }
}
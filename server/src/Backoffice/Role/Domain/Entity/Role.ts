import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class Role extends Aggregate {
  public static build(type: RoleType): Role {
    return new Role(ID.generate(), type)
  }

  constructor(
    _id: ID,
    readonly type: RoleType,
  ) {
    super(_id);
  }
}
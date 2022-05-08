import { Filter } from "Shared/Domain/Entities/Filter";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class RoleFilter extends Filter {
  public static ROLE_TYPE_FILTER = 'roleType';

  protected data: Map<string, any> = new Map();

  public withRoleType(type: RoleType): this {
    this.data.set(RoleFilter.ROLE_TYPE_FILTER, type);
    return this;
  };

  public apply(): Map<string, any> {
    return this.data;
  }
}
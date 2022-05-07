import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class RoleFilter implements Filter {
  public static ROLE_TYPE_FILTER = 'roleType';

  private data: Map<string, any> = new Map();

  public withRoleType(type: RoleType): this {
    this.data.set(RoleFilter.ROLE_TYPE_FILTER, type);
    return this;
  };

  public paginate(): Pagination {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return pagination;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
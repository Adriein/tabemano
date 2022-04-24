import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class UserFilter implements Filter {
  public static EMAIL_FILTER = 'email';
  public static ROLE_FILTER = 'roleType';

  private data: Map<string, any> = new Map();

  public withEmail(email: Email): this {
    this.data.set(UserFilter.EMAIL_FILTER, email);
    return this;
  };

  public withRole(roleType: RoleType): this {
    this.data.set(UserFilter.ROLE_FILTER, roleType);
    return this;
  }

  public paginate(): Pagination {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return pagination;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
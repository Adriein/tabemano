import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";

export class AuthFilter implements Filter {
  public static EMAIL_FILTER = 'email';

  private data: Map<string, any> = new Map();

  public withEmail(email: Email): this {
    this.data.set(AuthFilter.EMAIL_FILTER, email);
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
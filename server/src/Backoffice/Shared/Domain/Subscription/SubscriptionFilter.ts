import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export class SubscriptionFilter implements Filter {
  public static ACTIVE_FILTER = 'isActive';

  private data: Map<string, any> = new Map();

  public isActive(isActive: boolean): this {
    this.data.set(SubscriptionFilter.ACTIVE_FILTER, isActive);
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
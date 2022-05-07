import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export class PricingFilter implements Filter {
  public static NAME_FILTER = 'name';

  private data: Map<string, any> = new Map();

  public withName(name: string): this {
    this.data.set(PricingFilter.NAME_FILTER, name);
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
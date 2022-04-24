import { Pagination } from "Shared/Domain/Entities/Pagination";

export interface Filter {
  paginate(): Pagination;

  apply(): Map<string, any>;
}

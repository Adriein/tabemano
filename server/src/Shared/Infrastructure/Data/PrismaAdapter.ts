import { merge } from "merge-anything";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export abstract class PrismaAdapter<T> {
  protected prismaFilter = {};

  protected add(filter: T): void {
    this.prismaFilter = merge(this.prismaFilter, filter);
  }

  protected pagination(pagination: Pagination) {
    let filter = {};
    const paginationFilter = pagination.build();

    if (paginationFilter.has(Pagination.QUANTITY_FILTER)) {
      const quantity = paginationFilter.get(Pagination.QUANTITY_FILTER)!;

      filter = merge(filter, { take: quantity });
    }

    if (paginationFilter.has(Pagination.PAGE_FILTER)) {
      const page = paginationFilter.get(Pagination.PAGE_FILTER)!;

      const quantity = paginationFilter.get(Pagination.QUANTITY_FILTER)!;

      filter = merge(filter, { skip: (page - 1) * quantity });
    }

    return filter;
  }
}
import { merge } from "merge-anything";
import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export abstract class TypeOrmAdapter<T> {
  protected typeOrmFilter = {};

  protected add(filter: T): void {
    this.typeOrmFilter = merge(this.typeOrmFilter, filter);
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


  protected order(order: Order) {
    let filter = {};

    const orderFilter = order.build();

    for (const [ field, direction ] of orderFilter) {

    }
  }

}
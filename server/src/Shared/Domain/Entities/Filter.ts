import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): Pagination {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return pagination;
  }

  public orderBy(field: string): Order {
    const order = new Order(field);
    this.data.set(Order.ORDER_FILTER, order);
    return order;
  }

  public abstract apply(): Map<string, any>;
}

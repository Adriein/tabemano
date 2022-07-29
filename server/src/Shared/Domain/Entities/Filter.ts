import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";

export abstract class Filter {
  protected abstract data: Map<string, any>;

  public paginate(): this {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return this;
  }

  public orderBy(field: string): Order {
    const order = new Order(field);
    this.data.set(Order.ORDER_FILTER, order);
    return order;
  }

  public abstract apply(): Map<string, any>;

  public setQuantity(quantity: number): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER) as Pagination | undefined;

    if (!pagination) {
      throw new Error();
    }

    pagination.setQuantity(quantity);

    return this;
  }

  public setPage(page: number): this {
    const pagination = this.data.get(Pagination.PAGINATION_FILTER) as Pagination | undefined;

    if (!pagination) {
      throw new Error();
    }

    pagination.setPage(page);

    return this;
  }
}

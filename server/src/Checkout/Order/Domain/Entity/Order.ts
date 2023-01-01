import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Money } from "Shared/Domain/Entities/Money";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Order extends AggregateRoot {
  public static build(productId: ID, customerId: ID, price: Money): Order {
    return new Order(ID.generate(), productId, customerId, price, DateVo.now().value, DateVo.now().value);
  }

  constructor(
    id: ID,
    private _productId: ID,
    private _customerId: ID,
    private _price: Money,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(id, _createdAt, _updatedAt);
  }
}
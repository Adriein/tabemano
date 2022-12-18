import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Order extends AggregateRoot {
  constructor(id: ID, productId: ID, userId: ID, creationDate: Date,) {
    super(id);
  }
}
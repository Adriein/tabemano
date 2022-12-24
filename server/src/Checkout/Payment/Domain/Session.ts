import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Session extends AggregateRoot {
  constructor(
    _id: ID,
  ) {
    super(_id);
  }
}
import { AggregateRoot } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export abstract class Aggregate extends AggregateRoot {
  protected constructor(
    readonly id: ID,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    super();
  }
}

import { AggregateRoot as NestAggregate } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export abstract class AggregateRoot extends NestAggregate {
  protected constructor(
    private _id: ID,
    private _createdAt: Date = new Date(),
    private _updatedAt: Date = new Date(),
  ) {
    super();
  }


  public id(): ID {
    return this._id;
  }

  public createdAt(): Date {
    return this._createdAt;
  }

  public updatedAt(): Date {
    return this._updatedAt;
  }
}

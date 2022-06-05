import { AggregateRoot } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export abstract class Aggregate extends AggregateRoot {
  protected constructor(
    private _id: ID,
    private _createdAt?: Date,
    private _updatedAt?: Date
  ) {
    super();
  }

  public id(): ID {
    return this._id;
  }

  public createdAt(): Date {
    return this._createdAt ? this._createdAt : new Date();
  }

  public updatedAt(): Date {
    return this._updatedAt ? this._updatedAt : new Date();
  }

  public entityUpdated(): void {
    this._updatedAt = new Date();
  }
}

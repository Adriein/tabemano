import { AggregateRoot } from "@nestjs/cqrs";
import { ID } from "Shared/Domain/Vo/Id.vo";

export abstract class Aggregate extends AggregateRoot {
  protected constructor(
    private _id: ID,
    private _dateCreated?: Date,
    private _dateUpdated?: Date
  ) {
    super();
  }

  public id(): ID {
    return this._id;
  }

  public createdAt(): Date {
    return this._dateCreated ? this._dateCreated : new Date();
  }

  public updatedAt(): Date {
    return this._dateUpdated ? this._dateUpdated : new Date();
  }

  public entityUpdated(): void {
    this._dateUpdated = new Date();
  }
}

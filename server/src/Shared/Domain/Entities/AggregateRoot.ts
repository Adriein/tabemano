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

  public get id(): ID {
    return this._id;
  }

  protected set id(value: ID) {
    this._id = value;
  }
  
  public get createdAt(): Date {
    return this._createdAt ? this._createdAt : new Date();
  }

  public get updatedAt(): Date {
    return this._updatedAt ? this._updatedAt : new Date();
  }

  protected set createdAt(value: Date) {
    this._createdAt = value;
  }

  protected set updatedAt(value: Date) {
    this._updatedAt = value;
  }

  public entityUpdated(): void {
    this._updatedAt = new Date();
  }
}

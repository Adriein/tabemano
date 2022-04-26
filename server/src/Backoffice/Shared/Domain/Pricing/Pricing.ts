import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Pricing extends BaseEntity {
  constructor(
    _id: ID,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _duration: number,
    _createdAt?: Date,
    _updatedAt?: Date,
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): string {
    return this._name;
  }

  public price(): number {
    return this._price;
  }

  public duration(): number {
    return this._duration;
  }
}
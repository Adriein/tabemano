import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppFilterField extends BaseEntity {
  constructor(
    _id: ID,
    private _field: string,
    private _type: string,
    private _values: string[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public field(): string {
    return this._field;
  }

  public type(): string {
    return this._type;
  }

  public values(): string[] {
    return this._values;
  }
}
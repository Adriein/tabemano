import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class FilterableField extends BaseEntity {
  public static build(name: string, values: string[]): FilterableField {
    return new FilterableField(ID.generate(), name, values, new Date(), new Date());
  }

  constructor(
    _id: ID,
    private _name: string,
    private _values: string[],
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public name(): string {
    return this._name;
  }

  public values(): string[] {
    return this._values;
  }
}
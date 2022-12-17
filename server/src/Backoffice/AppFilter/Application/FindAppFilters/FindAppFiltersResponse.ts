import { Serializable } from "Shared/Domain/Interfaces/Serializable";

export class FindFiltersResponse implements Serializable {

  constructor(private _entity: string, private _fields: Record<string, string[]>) {}


  public get entity(): string {
    return this._entity;
  }

  public get fields(): Record<string, string[]> {
    return this._fields;
  }

  public serialize() {
    return {
      entity: this._entity,
      fields: this._fields
    }
  }
}
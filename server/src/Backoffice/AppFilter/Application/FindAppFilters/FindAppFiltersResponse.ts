import { Serializable } from "Backoffice/Shared/Domain/Serializable";

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
      [this._entity]: this._fields
    }
  }
}
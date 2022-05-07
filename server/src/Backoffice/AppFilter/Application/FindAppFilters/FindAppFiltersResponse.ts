export class FindFiltersResponse {

  constructor(private _entity: string, private _fields: Record<string, string[]>) {}


  public get entity(): string {
    return this._entity;
  }

  public get fields(): Record<string, string[]> {
    return this._fields;
  }
}
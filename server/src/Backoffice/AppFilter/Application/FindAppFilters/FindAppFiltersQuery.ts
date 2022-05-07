export class FindAppFiltersQuery {
  public static fromJson(json: any): FindAppFiltersQuery {
    return new FindAppFiltersQuery(json.tenantId, json.entities);
  }

  constructor(private _tenantId: string, private _entities: string[]) {}


  public get tenantId(): string {
    return this._tenantId;
  }

  public get entities(): string[] {
    return this._entities;
  }
}
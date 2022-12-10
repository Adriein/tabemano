export class GetProductListQuery {
  constructor(
    private readonly _country: string,
  ) {}

  public get country(): string {
    return this._country;
  }
}
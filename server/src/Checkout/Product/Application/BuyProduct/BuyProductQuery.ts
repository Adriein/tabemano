export class BuyProductQuery {
  constructor(
    private readonly _userId: string,
    private readonly _productId: string,
  ) {}

  public get userId(): string {
    return this._userId;
  }

  public get productId(): string {
    return this._productId;
  }
}
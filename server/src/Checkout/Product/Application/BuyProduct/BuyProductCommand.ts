export class BuyProductCommand {
  constructor(
    private readonly _customerId: string,
    private readonly _productId: string,
  ) {}

  public get customerId(): string {
    return this._customerId;
  }

  public get productId(): string {
    return this._productId;
  }
}
export class BuyProductCommand {
  constructor(private readonly _productId: string) {}
  
  public get productId(): string {
    return this._productId;
  }
}
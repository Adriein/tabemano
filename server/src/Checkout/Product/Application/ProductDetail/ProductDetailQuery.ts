export class ProductDetailQuery {
  constructor(private _productId: string) {}
  
  public get productId(): string {
    return this._productId;
  }
}
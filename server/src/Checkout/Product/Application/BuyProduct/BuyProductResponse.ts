export class BuyProductResponse {
  constructor(private _checkoutSessionPublicToken: string) {}

  public get checkoutSessionPublicToken(): string {
    return this._checkoutSessionPublicToken;
  }
}
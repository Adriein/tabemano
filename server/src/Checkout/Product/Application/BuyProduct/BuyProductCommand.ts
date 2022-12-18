export class BuyProductCommand {
  constructor(
    private readonly _userId: string,
    private readonly _productId: string,
    private readonly _creditCardNumber: string,
    private readonly _creditCardExpirationDate: Date,
    private readonly _ccv: string,
  ) {}
  
  public get userId(): string {
    return this._userId;
  }

  public get productId(): string {
    return this._productId;
  }

  public get creditCardNumber(): string {
    return this._creditCardNumber;
  }

  public get creditCardExpirationDate(): Date {
    return this._creditCardExpirationDate;
  }

  public get ccv(): string {
    return this._ccv;
  }
}
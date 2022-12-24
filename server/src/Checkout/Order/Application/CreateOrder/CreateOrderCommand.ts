export class CreateOrderCommand {
  constructor(
    private _productId: string,
    private _userId: string,
    private _creditCardNumber: string,
    private _creditCardExpirationDate: Date,
    private _ccv: string,
  ) {}


  public get productId(): string {
    return this._productId;
  }

  public get userId(): string {
    return this._userId;
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
export class PricingVo {
  constructor(
    private readonly _name: string,
    private readonly _price: number,
    private readonly _duration: number
  ) {}

  public get name(): string {
    return this._name;
  }

  public get price(): number {
    return this._price;
  }

  public get duration(): number {
    return this._duration;
  }
}
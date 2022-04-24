import { ID } from "Shared/Domain/Vo/Id.vo";

export class PricingVo {
  constructor(
    private readonly _id: ID,
    private readonly _name: string,
    private readonly _price: number,
    private readonly _duration: number
  ) {}


  public get id(): ID {
    return this._id;
  }

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
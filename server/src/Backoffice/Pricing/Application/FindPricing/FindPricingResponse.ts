import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { Serializable } from "Shared/Domain/Interfaces/Serializable";
import { Money } from "Shared/Domain/Entities/Money";


export class FindPricingResponse implements Serializable {
  public static fromDomain(pricing: Pricing): FindPricingResponse {
    return new FindPricingResponse(pricing.id().value, pricing.name(), pricing.price(), pricing.duration());
  }

  constructor(
    private readonly _id: string,
    private readonly _name: string,
    private readonly _amount: Money,
    private readonly _duration: number
  ) {}

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }


  public get amount(): Money {
    return this._amount;
  }

  public get duration(): number {
    return this._duration;
  }

  public serialize() {
    return {
      id: this._id,
      name: this._name,
      amount: this._amount,
      duration: this._duration
    }
  }
}
import { MONTHLY_PRICING, QUARTERLY_PRICING } from "Backoffice/Shared/constants";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Pricing extends AggregateRoot {
  public static build(name: string, duration: number, price: number, tenantId: ID): Pricing {
    return new Pricing(
      ID.generate(),
      name,
      duration,
      price,
      tenantId
    );
  }

  public static monthly(tenantId: ID): Pricing {
    return Pricing.build(MONTHLY_PRICING, 30, 50, tenantId);
  }

  public static quarterly(tenantId: ID): Pricing {
    return Pricing.build(QUARTERLY_PRICING, 30, 50, tenantId);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _duration: number,
    private _price: number,
    private _tenantId: ID
  ) {
    super(_id);
  }

  public name(): string {
    return this._name;
  }

  public duration(): number {
    return this._duration;
  }

  public price(): number {
    return this._price;
  }

  public tenantId(): ID {
    return this._tenantId;
  }
}
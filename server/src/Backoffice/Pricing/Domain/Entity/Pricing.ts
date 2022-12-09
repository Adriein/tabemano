import { MONTHLY_PRICING, QUARTERLY_PRICING } from "Backoffice/Shared/constants";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Money } from "Shared/Domain/Entities/Money";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";

export class Pricing extends AggregateRoot {
  public static build(name: string, duration: number, price: Money, tenantId: ID): Pricing {
    return new Pricing(
      ID.generate(),
      name,
      duration,
      price,
      tenantId
    );
  }

  public static monthly(tenantId: ID): Pricing {
    return Pricing.build(MONTHLY_PRICING, 30, new Money(new NumberVo(50), new Currency('EUR')), tenantId);
  }

  public static quarterly(tenantId: ID): Pricing {
    return Pricing.build(QUARTERLY_PRICING, 90, new Money(new NumberVo(150), new Currency('EUR')), tenantId);
  }

  constructor(
    _id: ID,
    private _name: string,
    private _duration: number,
    private _price: Money,
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

  public price(): Money {
    return this._price;
  }

  public tenantId(): ID {
    return this._tenantId;
  }
}
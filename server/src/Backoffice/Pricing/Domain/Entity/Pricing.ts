import { MONTHLY_PRICING, QUARTERLY_PRICING } from "Backoffice/Shared/constants";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class Pricing extends Aggregate {
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
    return Pricing.build(QUARTERLY_PRICING, 90, 150, tenantId);
  }

  constructor(
    readonly id: ID,
    readonly name: string,
    readonly duration: number,
    readonly price: number,
    readonly tenantId: ID
  ) {
    super(id);
  }
}
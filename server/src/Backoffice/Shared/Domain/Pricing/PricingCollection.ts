import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Collection } from "Shared/Domain/Entities/Collection";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class PricingCollection extends Collection<Pricing> {
  public static build(pricing: Pricing[] = []): PricingCollection {
    return new PricingCollection(pricing);
  }

  constructor(pricing: Pricing[]) {
    super(pricing);
  }

  public getPricingByName(name: string): Pricing {
    return this.getBy((pricing: Pricing) => pricing.name() === name);
  }

  public getPricingById(id: ID): Pricing {
    return this.getBy((pricing: Pricing) => pricing.id().value === id.value);
  }
}
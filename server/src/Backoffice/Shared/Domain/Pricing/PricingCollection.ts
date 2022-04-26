import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Collection } from "Shared/Domain/Entities/Collection";

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
}
import { PricingVo } from "Backoffice/Shared/Domain/Vo/PricingVo";
import { VoCollection } from "Shared/Domain/Entities/VoCollection";


export class PricingVoCollection extends VoCollection<PricingVo> {
  public static build(pricing: PricingVo[] = []): PricingVoCollection {
    return new PricingVoCollection(pricing);
  }

  constructor(pricing: PricingVo[]) {
    super(pricing);
  }

  public getPricingByName(name: string): PricingVo {
    return this.getBy((pricingVo: PricingVo) => pricingVo.name === name);
  }
}
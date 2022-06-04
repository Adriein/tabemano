import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { Log } from "Shared/Domain/Decorators/Log";
import { ID } from "Shared/Domain/Vo/Id.vo";


@QueryHandler(FindPricingQuery)
export class FindPricingQueryHandler implements IQueryHandler {
  constructor(private readonly repository: IPricingRepository) {}

  @Log()
  public async execute(query: FindPricingQuery): Promise<FindPricingResponse[]> {
    const tenantId = new ID(query.tenantId);
    const pricingList = await this.findPricing(tenantId);

    return pricingList.map((pricing: Pricing) => FindPricingResponse.fromDomain(pricing));
  }

  private async findPricing(tenantId: ID): Promise<Pricing[]> {
    const filter = PricingFilter.builder().withTenantId(tenantId);

    const result = await this.repository.find(filter);

    return result.unwrap();
  }
}
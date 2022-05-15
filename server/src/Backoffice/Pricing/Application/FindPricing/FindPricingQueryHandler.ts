import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { Log } from "Shared/Domain/Decorators/Log";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";


@QueryHandler(FindPricingQuery)
export class FindPricingQueryHandler implements IQueryHandler<FindPricingResponse[]> {
  constructor(private readonly repository: IPricingRepository) {}

  @Log()
  public async handle(query: FindPricingQuery): Promise<FindPricingResponse[]> {
    const tenantId = new ID(query.tenantId);
    const pricingList = await this.findPricing(tenantId);

    return pricingList.map((pricing: Pricing) => FindPricingResponse.fromDomain(pricing));
  }

  private async findPricing(tenantId: ID): Promise<Pricing[]> {
    const filter = PricingFilter.builder().withTenantId(tenantId);

    const result = await this.repository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
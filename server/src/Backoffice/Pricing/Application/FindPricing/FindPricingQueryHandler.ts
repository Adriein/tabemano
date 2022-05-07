import { FindPricingQuery } from "Backoffice/Pricing/Application/FindPricing/FindPricingQuery";
import { FindPricingResponse } from "Backoffice/Pricing/Application/FindPricing/FindPricingResponse";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { Log } from "Shared/Domain/Decorators/Log";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";


@QueryHandler(FindPricingQuery)
export class SignInQueryHandler implements IQueryHandler<FindPricingResponse> {
  constructor(private readonly repository: IPricingRepository) {}

  @Log()
  public async handle(query: FindPricingQuery): Promise<FindPricingResponse> {
    const pricing = await this.findPricing(query.name);

    return FindPricingResponse.fromDomain(pricing);
  }

  private async findPricing(name: string): Promise<Pricing> {
    const filter = new PricingFilter();
    filter.withName(name);

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
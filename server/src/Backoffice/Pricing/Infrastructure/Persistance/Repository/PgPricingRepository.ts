import { Result } from "@badrap/result";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";

export class PgPricingRepository implements IPricingRepository {
  delete(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: PricingFilter): Promise<Result<Pricing[], Error>> {
    throw new Error();
  }

  public async findOne(filter: PricingFilter): Promise<Result<Pricing, Error>> {
    throw new Error();
  }

  public async save(entity: Pricing): Promise<void> {
    throw new Error();
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

}
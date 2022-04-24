import { PrismaClient } from "@prisma/client";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entities/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entities/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entities/PricingFilter";
import { PrismaPricingFilterAdapter } from "Backoffice/Pricing/Infrastructure/Data/Filters/PrismaPricingFilterAdapter";
import { PgTenantMapper } from "Backoffice/Pricing/Infrastructure/Data/Mappers/PgPricingMapper";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgPricingRepository implements IPricingRepository {
  private readonly database = Database.instance();
  private readonly mapper = new PgTenantMapper();

  delete(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: PricingFilter): Promise<Either<Error, Pricing[]>> {
    throw new Error();
  }

  public async findOne(filter: PricingFilter): Promise<Either<Error, Pricing>> {
    return this.database.execute<Pricing>(async (connection: PrismaClient) => {
      const adapter = new PrismaPricingFilterAdapter(filter);

      const [ result ]: any = await connection.ta_pricing.findMany(adapter.apply());

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(this.mapper.toDomain(result))
    });
  }

  save(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

}
import { PrismaClient } from "@prisma/client";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { PrismaPricingFilterAdapter } from "Backoffice/Pricing/Infrastructure/Data/Filter/PrismaPricingFilterAdapter";
import { PgTenantMapper } from "Backoffice/Pricing/Infrastructure/Data/Mapper/PgPricingMapper";
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

  public async save(entity: Pricing): Promise<void> {
    await this.database.execute<void>(async (connection: PrismaClient) => {
      await connection.ta_pricing.create({
        data: {
          pr_id: entity.id().value,
          pr_name: entity.name(),
          pr_duration: entity.duration(),
          pr_price: entity.price(),
          pr_tenant_id: entity.tenantId().value,
          pr_created_at: entity.createdAt(),
          pr_updated_at: entity.updatedAt()
        }
      });

      return Right.success({});
    });
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

}
import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { IPricingRepository } from "Backoffice/Pricing/Domain/Entity/IPricingRepository";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingFilter } from "Backoffice/Pricing/Domain/Entity/PricingFilter";
import { PgPricingMapper } from "Backoffice/Pricing/Infrastructure/Persistance/Mapper/PgPricingMapper";
import { PricingModel } from "Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { ClassConstructor } from "class-transformer";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgPricingRepository extends TypeOrmRepository<PricingModel> implements IPricingRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgPricingMapper
  ) {
    super();
  }

  delete(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: PricingFilter): Promise<Result<Pricing[], Error>> {
    throw new Error();
  }

  public async findOne(filter: PricingFilter): Promise<Result<Pricing, RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Pricing): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  update(entity: Pricing): Promise<void> {
    return Promise.resolve(undefined);
  }

  protected entitySchema(): ClassConstructor<PricingModel> {
    return PricingModel;
  }
}
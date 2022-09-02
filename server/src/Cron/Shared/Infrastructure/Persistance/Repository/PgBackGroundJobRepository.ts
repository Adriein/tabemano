import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { BackGroundJob } from "Cron/Shared/Domain/Entity/BackGroundJob";
import { IBackGroundJobRepository } from "Cron/Shared/Domain/Repository/IBackGroundJobRepository";
import { PgBackGroundJobMapper } from "Cron/Shared/Infrastructure/Persistance/Mapper/PgBackGroundJobMapper";
import { BackGroundJobModel } from "Cron/Shared/Infrastructure/Persistance/Model/BackGroundJobModel";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgBackGroundJobRepository extends TypeOrmRepository<BackGroundJobModel> implements IBackGroundJobRepository {

  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgBackGroundJobMapper,
  ) {
    super();
  }

  delete(entity: BackGroundJob): Promise<void> {
    throw new Error('Not implemented yet');
  }

  find(filter: Filter): Promise<Result<BackGroundJob[], Error>> {
    throw new Error('Not implemented yet');
  }

  findOne(filter: Filter): Promise<Result<BackGroundJob, Error | RecordNotFoundError>> {
    throw new Error('Not implemented yet');
  }

  public async save(entity: BackGroundJob): Promise<void> {
    const model = this.mapper.toModel(entity);
    await this.repository().save(model);
  }

  update(entity: BackGroundJob): Promise<void> {
    throw new Error('Not implemented yet');
  }

  protected entitySchema(): ClassConstructor<BackGroundJobModel> {
    return BackGroundJobModel;
  }
}
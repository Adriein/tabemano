import { Result } from '@badrap/result';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import Database from 'Shared/Infrastructure/Persistance/Database';
import { TypeOrmRepository } from 'Shared/Infrastructure/Persistance/Repository/TypeOrmRepository';
import { PgThirdPartyServiceMapper } from '../Mapper/PgThirdPartyServiceMapper';
import { ThirdPartyServiceModel } from '../../../../../Shared/Infrastructure/Persistance/Model/ThirdPartyServiceModel';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { TypeOrmThirdPartyServiceFilterAdapter } from '../Filter/TypeOrmThirdPartyServiceFilterAdapter';

@Injectable()
export class PgThirdPartyServiceRepository
  extends TypeOrmRepository<ThirdPartyServiceModel>
  implements IThirdPartyServiceRepository
{
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgThirdPartyServiceMapper
  ) {
    super();
  }

  public async findOne(
    filter: ThirdPartyServiceFilter
  ): Promise<Result<ThirdPartyService, Error | RecordNotFoundError>> {
    const adapter = new TypeOrmThirdPartyServiceFilterAdapter(filter);

    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async find(filter: ThirdPartyServiceFilter): Promise<Result<ThirdPartyService[], Error>> {
    const adapter = new TypeOrmThirdPartyServiceFilterAdapter(filter);

    const results = await this.repository().find(adapter.apply());

    return results
      ? Result.ok(results.map((result: ThirdPartyServiceModel) => this.mapper.toDomain(result)))
      : Result.err(new RecordNotFoundError());
  }

  public async save(entity: ThirdPartyService): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  public async update(entity: ThirdPartyService): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().update({ id: entity.id() }, model);
  }

  public async delete(entity: ThirdPartyService): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected entitySchema() {
    return ThirdPartyServiceModel;
  }
}

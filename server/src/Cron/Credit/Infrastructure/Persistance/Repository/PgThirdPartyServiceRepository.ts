import { Result } from '@badrap/result';
import { Inject, Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { ClassConstructor } from 'class-transformer';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import Database from 'Shared/Infrastructure/Persistance/Database';
import { TypeOrmRepository } from 'Shared/Infrastructure/Persistance/Repository/TypeOrmRepository';
import { PgThirdPartyServiceMapper } from '../Mapper/PgThirdPartyServiceMapper';
import { ThirdPartyServiceModel } from '../Model/ThirdPartyServiceModel';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';

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
    throw new Error('Method not implemented.');
  }

  public async find(filter: ThirdPartyServiceFilter): Promise<Result<ThirdPartyService[], Error>> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: ThirdPartyService): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async update(entity: ThirdPartyService): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().update({ id: entity.id() }, model);
  }

  public async delete(entity: ThirdPartyService): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected entitySchema(): ClassConstructor<ThirdPartyServiceModel> {
    return ThirdPartyServiceModel;
  }
}

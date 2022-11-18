import { Result } from '@badrap/result';
import { Inject, Injectable } from '@nestjs/common';
import Database from 'Shared/Infrastructure/Persistance/Database';
import { Module } from 'Authorization/Permission/Domain/Entity/Module';
import { ModuleModel } from 'Shared/Infrastructure/Persistance/Model/ModuleModel';
import { IModuleRepository } from 'Backoffice/Module/Domain/Repository/IModuleRepository';
import { Filter } from 'Shared/Domain/Entities/Filter';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import { TypeOrmRepository } from 'Shared/Infrastructure/Persistance/Repository/TypeOrmRepository';
import { DataSource } from 'typeorm';
import { PgModuleMapper } from '../Mapper/PgModuleMapper';
import { TypeOrmModuleFilterAdapter } from '../Filter/TypeOrmModuleFilterAdapter';
import { ModuleFilter } from 'Authorization/Permission/Domain/Filter/ModuleFilter';

@Injectable()
export class PgModuleRepository
  extends TypeOrmRepository<ModuleModel>
  implements IModuleRepository
{
  constructor(
    @Inject(Database.DATABASE_CONNECTION) protected readonly dataSource: DataSource,
    private readonly mapper: PgModuleMapper
  ) {
    super();
  }

  public async findOne(filter: ModuleFilter): Promise<Result<Module, Error | RecordNotFoundError>> {
    const adapter = new TypeOrmModuleFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async find(filter: Filter): Promise<Result<Module[], Error>> {
    throw new Error('Method not implemented.');
  }

  public async save(entity: Module): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  public async update(entity: Module): Promise<void> {
    throw new Error('Method not implemented.');
  }

  public async delete(entity: Module): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected entitySchema() {
    return ModuleModel;
  }
}

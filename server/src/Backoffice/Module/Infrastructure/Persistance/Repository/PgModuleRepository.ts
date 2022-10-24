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

  findOne(filter: Filter): Promise<Result<Module, Error | RecordNotFoundError>> {
    throw new Error('Method not implemented.');
  }

  find(filter: Filter): Promise<Result<Module[], Error>> {
    throw new Error('Method not implemented.');
  }

  save(entity: Module): Promise<void> {
    throw new Error('Method not implemented.');
  }

  update(entity: Module): Promise<void> {
    throw new Error('Method not implemented.');
  }

  delete(entity: Module): Promise<void> {
    throw new Error('Method not implemented.');
  }

  protected entitySchema() {
    return ModuleModel;
  }
}

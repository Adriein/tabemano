import { Result } from '@badrap/result';
import { Inject, Injectable } from '@nestjs/common';
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { IPermissionRepository } from 'Authorization/Permission/Domain/Repository/IPermissionRepository';
import { RecordNotFoundError } from 'Shared/Domain/Error/RecordNotFoundError';
import Database from 'Shared/Infrastructure/Persistance/Database';
import { TypeOrmRepository } from 'Shared/Infrastructure/Persistance/Repository/TypeOrmRepository';
import { DataSource } from 'typeorm';
import { TypeOrmPermissionFilterAdapter } from '../Filter/TypeOrmPermissionFilterAdapter';
import { PgPermissionMapper } from '../Mapper/PgPermissionMapper';
import { UserModuleModel } from '../Model/UserModuleModel';

@Injectable()
export class PgPermissionRepository
  extends TypeOrmRepository<UserModuleModel>
  implements IPermissionRepository
{
  constructor(
    @Inject(Database.DATABASE_CONNECTION) protected readonly dataSource: DataSource,
    private readonly mapper: PgPermissionMapper
  ) {
    super();
  }

  public async delete(entity: Permission): Promise<void> {
    throw new Error();
  }

  public async find(filter: PermissionFilter): Promise<Result<Permission[], Error>> {
    const adapter = new TypeOrmPermissionFilterAdapter(filter);
    const results = await this.repository().find(adapter.apply());

    return results
      ? Result.ok(results.map((result: UserModuleModel) => this.mapper.toDomain(result)))
      : Result.err(new RecordNotFoundError());
  }

  public async findOne(filter: PermissionFilter): Promise<Result<Permission, RecordNotFoundError>> {
    const adapter = new TypeOrmPermissionFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Permission): Promise<void> {
    throw new Error();
  }

  public async update(entity: Permission): Promise<void> {
    throw new Error();
  }

  protected entitySchema() {
    return UserModuleModel;
  }
}

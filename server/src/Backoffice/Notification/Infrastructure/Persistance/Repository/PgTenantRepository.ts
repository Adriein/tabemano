import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { ITenantRepository } from "Backoffice/Notification/Domain/Repository/ITenantRepository";
import { TypeOrmTenantFilterAdapter } from "Backoffice/Notification/Infrastructure/Persistance/Filter/TypeOrmTenantFilterAdapter";
import { TenantMapper } from "Backoffice/Notification/Infrastructure/Persistance/Mapper/TenantMapper";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { ClassConstructor } from "class-transformer";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgTenantRepository extends TypeOrmRepository<TenantModel> implements ITenantRepository {

  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: TenantMapper,
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<TenantModel> {
    return TenantModel;
  }

  delete(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: TenantFilter): Promise<Result<Tenant[], Error>> {
    throw new Error();
  }

  public async findOne(filter: TenantFilter): Promise<Result<Tenant, Error | RecordNotFoundError>> {
    const adapter = new TypeOrmTenantFilterAdapter(filter);

    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  save(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

}
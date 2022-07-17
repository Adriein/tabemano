import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { TypeOrmTenantFilterAdapter } from "Backoffice/Tenant/Infrastructure/Persistance/Filter/TypeOrmTenantFilterAdapter";
import { PgTenantMapper } from "Backoffice/Tenant/Infrastructure/Persistance/Mapper/PgTenantMapper";
import { TenantModel } from "Backoffice/Tenant/Infrastructure/Persistance/Model/TenantModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgTenantRepository extends TypeOrmRepository<TenantModel> implements ITenantRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgTenantMapper,
  ) {
    super();
  }

  delete(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: UserFilter): Promise<Result<Tenant[], Error>> {
    throw new Error();
  }

  public async findOne(filter: UserFilter): Promise<Result<Tenant, RecordNotFoundError>> {
    const adapter = new TypeOrmTenantFilterAdapter(filter);

    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Tenant): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  update(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  protected entitySchema() {
    return TenantModel;
  }

}
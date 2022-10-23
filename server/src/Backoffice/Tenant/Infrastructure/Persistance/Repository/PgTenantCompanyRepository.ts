import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { ITenantCompanyRepository } from "Backoffice/Tenant/Domain/Repository/ITenantCompanyRepository";
import { PgTenantCompanyMapper } from "Backoffice/Tenant/Infrastructure/Persistance/Mapper/PgTenantCompanyMapper";
import { ClassConstructor } from "class-transformer";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgTenantCompanyRepository extends TypeOrmRepository<TenantCompanyModel> implements ITenantCompanyRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgTenantCompanyMapper,
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<TenantCompanyModel> {
    return TenantCompanyModel;
  }

  delete(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<Tenant[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<Tenant, Error | RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Tenant): Promise<void> {
    const model = this.mapper.toModel(entity);
    console.log(model)
    await this.repository().save(model);
  }

  update(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

}
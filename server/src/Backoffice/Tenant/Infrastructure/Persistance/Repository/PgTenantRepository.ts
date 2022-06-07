import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { User } from "Backoffice/Shared/Domain/User/User";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { UserModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/UserModel";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource, EntitySchema } from "typeorm";

@Injectable()
export class PgTenantRepository extends TypeOrmRepository<User> implements ITenantRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
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
    throw new Error();
  }

  public async save(entity: Tenant): Promise<void> {
    throw new Error();
  }

  update(entity: Tenant): Promise<void> {
    return Promise.resolve(undefined);
  }

  protected entitySchema(): EntitySchema<User> {
    return UserModel;
  }

}
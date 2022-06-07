import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { Role } from "Backoffice/Role/Domain/Entity/Role";
import { RoleFilter } from "Backoffice/Role/Domain/Entity/RoleFilter";
import { IRoleRepository } from "Backoffice/Role/Domain/Repository/IRoleRepository";
import { TypeOrmRoleFilterAdapter } from "Backoffice/Role/Infrastructure/Persistance/Filter/TypeOrmRoleFilterAdapter";
import { RoleModel } from "Backoffice/Role/Infrastructure/Persistance/Model/RoleModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource, EntitySchema } from "typeorm";

export class PgRoleRepository extends TypeOrmRepository<Role> implements IRoleRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
  ) {
    super();
  }

  delete(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: RoleFilter): Promise<Result<Role[], Error>> {
    throw new Error();
  }

  public async findOne(filter: RoleFilter): Promise<Result<Role, RecordNotFoundError>> {
    const adapter = new TypeOrmRoleFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(result) : Result.err(new RecordNotFoundError());
  }

  save(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  protected entitySchema(): EntitySchema<Role> {
    return RoleModel;
  }

}
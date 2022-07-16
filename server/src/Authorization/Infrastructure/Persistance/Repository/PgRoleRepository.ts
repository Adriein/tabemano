import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Role } from "Authorization/Domain/Entity/Role";
import { RoleFilter } from "Authorization/Domain/Filter/RoleFilter";
import { IRoleRepository } from "Authorization/Domain/Repository/IRoleRepository";
import { TypeOrmRoleFilterAdapter } from "Authorization/Infrastructure/Persistance/Filter/TypeOrmRoleFilterAdapter";
import { PgRoleMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgRoleMapper";
import { RoleModel } from "Authorization/Infrastructure/Persistance/Model/RoleModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgRoleRepository extends TypeOrmRepository<RoleModel> implements IRoleRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgRoleMapper,
  ) {
    super();
  }

  public async delete(entity: Role): Promise<void> {
    throw new Error();
  }

  public async find(filter: RoleFilter): Promise<Result<Role[], Error>> {
    throw new Error();
  }

  public async findOne(filter: RoleFilter): Promise<Result<Role, RecordNotFoundError>> {
    const adapter = new TypeOrmRoleFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Role): Promise<void> {
    throw new Error();
  }

  public async update(entity: Role): Promise<void> {
    throw new Error();
  }

  protected entitySchema() {
    return RoleModel;
  }
}
import { PrismaClient } from "@prisma/client";
import { Role } from "Backoffice/Role/Domain/Entity/Role";
import { RoleFilter } from "Backoffice/Role/Domain/Entity/RoleFilter";
import { IRoleRepository } from "Backoffice/Role/Domain/Repository/IRoleRepository";
import { PrismaRoleFilterAdapter } from "Backoffice/Role/Infrastructure/Data/Filter/PrismaRoleFilterAdapter";
import { PgRoleMapper } from "Backoffice/Role/Infrastructure/Data/Mapper/PgRoleMapper";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgRoleRepository implements IRoleRepository {
  private database = Database.instance();
  private mapper = new PgRoleMapper();

  delete(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: RoleFilter): Promise<Either<Error, Role[]>> {
    throw new Error();
  }

  public async findOne(filter: RoleFilter): Promise<Either<Error, Role>> {
    return await this.database.execute<Role>(async (connection: PrismaClient) => {
      const adapter = new PrismaRoleFilterAdapter(filter);

      const [ result ] = await connection.ta_role.findMany(adapter.apply());

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(this.mapper.toDomain(result))
    });
  }

  save(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

}
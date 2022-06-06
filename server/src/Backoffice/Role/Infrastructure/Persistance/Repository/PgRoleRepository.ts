import { Result } from "@badrap/result";
import { Role } from "Backoffice/Role/Domain/Entity/Role";
import { RoleFilter } from "Backoffice/Role/Domain/Entity/RoleFilter";
import { IRoleRepository } from "Backoffice/Role/Domain/Repository/IRoleRepository";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgRoleRepository implements IRoleRepository {
  delete(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: RoleFilter): Promise<Result<Role[], Error>> {
    throw new Error();
  }

  public async findOne(filter: RoleFilter): Promise<Result<Role, RecordNotFoundError>> {
    throw new Error();
  }

  save(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Role): Promise<void> {
    return Promise.resolve(undefined);
  }

}
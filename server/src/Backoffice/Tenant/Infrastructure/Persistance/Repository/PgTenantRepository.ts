import { Result } from "@badrap/result";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgTenantRepository implements ITenantRepository {
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

}
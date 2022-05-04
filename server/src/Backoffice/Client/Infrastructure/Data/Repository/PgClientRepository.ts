import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgClientRepository implements IClientRepository {
  private database = Database.instance();

  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: UserFilter): Promise<Either<Error, Client[]>> {
    throw new Error();
  }

  findOne(filter: UserFilter): Promise<Either<Error, Client>> {
    throw new Error();
  }

  save(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

}
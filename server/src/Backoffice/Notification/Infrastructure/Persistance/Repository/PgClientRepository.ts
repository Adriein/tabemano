import { Result } from "@badrap/result";
import { Client } from "Backoffice/Notification/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Notification/Domain/Repository/IClientRepository";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgClientRepository implements IClientRepository {
  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<Client[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<Client, Error | RecordNotFoundError>> {
    throw new Error();
  }

  save(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

}
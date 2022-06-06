import { Result } from "@badrap/result";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgClientRepository implements IClientRepository {
  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: UserFilter): Promise<Result<Client[], Error>> {
    throw new Error();
  }

  public async findOne(filter: UserFilter): Promise<Result<Client, RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Client): Promise<void> {
    throw new Error();
  }

  update(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async count(): Promise<Result<number, Error>> {
    throw new Error();
  }

}
import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { TypeOrmClientFilterAdapter } from "Backoffice/Client/Infrastructure/Persistance/Filter/TypeOrmClientFilterAdapter";
import { ClientModel } from "Backoffice/Client/Infrastructure/Persistance/Model/ClientModel";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource, EntitySchema } from "typeorm";

export class PgClientRepository extends TypeOrmRepository<Client> implements IClientRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
  ) {
    super();
  }

  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: UserFilter): Promise<Result<Client[], Error>> {
    throw new Error();
  }

  public async findOne(filter: UserFilter): Promise<Result<Client, RecordNotFoundError>> {
    const adapter = new TypeOrmClientFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(result) : Result.err(new RecordNotFoundError());
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

  protected entitySchema(): EntitySchema<Client> {
    return ClientModel;
  }

}
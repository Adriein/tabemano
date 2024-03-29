import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { Client } from "Cron/Client/Domain/Entity/Client";
import { ClientFilter } from "Cron/Client/Domain/Filter/ClientFilter";
import { IClientRepository } from "Cron/Client/Domain/Repository/IClientRepository";
import { TypeOrmClientFilterAdapter } from "Cron/Client/Infrastructure/Persistance/Filter/TypeOrmClientFilterAdapter";
import { PgClientMapper } from "Cron/Client/Infrastructure/Persistance/Mapper/PgClientMapper";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgClientRepository extends TypeOrmRepository<UserModel> implements IClientRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgClientMapper,
  ) {
    super();
  }

  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: ClientFilter): Promise<Result<Client[], Error>> {
    try {
      const adapter = new TypeOrmClientFilterAdapter(filter);

      const results = await this.repository().find(adapter.apply());

      return Result.ok(results.map((model: UserModel) => this.mapper.toDomain(model)))
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  findOne(filter: ClientFilter): Promise<Result<Client, Error | RecordNotFoundError>> {
    throw new Error()
  }

  save(entity: Client): Promise<void> {
    throw new Error()
  }

  update(entity: Client): Promise<void> {
    throw new Error()
  }

  protected entitySchema(): ClassConstructor<UserModel> {
    return UserModel;
  }

}
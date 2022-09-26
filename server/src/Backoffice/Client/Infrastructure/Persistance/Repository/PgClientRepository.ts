import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { PgClientMapper } from "Backoffice/Client/Infrastructure/Persistance/Mapper/PgClientMapper";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IClientRepository } from "Backoffice/Client/Domain/Repository/IClientRepository";
import { TypeOrmClientFilterAdapter } from "Backoffice/Client/Infrastructure/Persistance/Filter/TypeOrmClientFilterAdapter";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgClientRepository extends TypeOrmRepository<UserModel> implements IClientRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgClientMapper
  ) {
    super();
  }

  delete(entity: Client): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: UserFilter): Promise<Result<Client[], Error>> {
    try {
      const adapter = new TypeOrmClientFilterAdapter(filter);
      const results = await this.repository().find(adapter.apply());

      return Result.ok(results.map((result: UserModel) => this.mapper.toDomain(result)));
    } catch (error) {
      return Result.err(error as Error)
    }
  }

  public async findOne(filter: UserFilter): Promise<Result<Client, RecordNotFoundError>> {
    const adapter = new TypeOrmClientFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Client): Promise<void> {
    const model = this.mapper.toModel(entity);

    await this.repository().save(model);
  }

  public async update(entity: Client): Promise<void> {
    const model = this.mapper.toModel(entity);

    throw new Error();
  }

  protected entitySchema() {
    return UserModel;
  }

}
import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Filter/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Repository/IAuthRepository";
import { TypeOrmAuthFilterAdapter } from "Authorization/Infrastructure/Persistance/Filter/TypeOrmAuthFilterAdapter";
import { PgAuthMapper } from "Authorization/Infrastructure/Persistance/Mapper/PgAuthMapper";
import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgAuthRepository extends TypeOrmRepository<AuthModel> implements IAuthRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgAuthMapper,
  ) {
    super();
  }

  public async delete(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async find(filter: AuthFilter): Promise<Result<Auth[], Error>> {
    throw new Error();
  }

  public async findOne(filter: AuthFilter): Promise<Result<Auth, RecordNotFoundError>> {
    const adapter = new TypeOrmAuthFilterAdapter(filter);
    const result = await this.repository().findOne(adapter.apply());
    
    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async update(entity: Auth): Promise<void> {
    throw new Error();
  }

  protected entitySchema() {
    return AuthModel;
  }
}
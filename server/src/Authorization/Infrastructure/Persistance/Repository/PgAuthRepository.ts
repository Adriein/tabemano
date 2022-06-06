import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entity/IAuthRepository";
import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { IAuthModel } from "Authorization/Infrastructure/Persistance/Model/IAuthModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource, EntitySchema, Repository } from "typeorm";

@Injectable()
export class PgAuthRepository extends TypeOrmRepository<Auth> implements IAuthRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
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
    const result = await this.repository().findOne({ where: { email: new Email('adria.claret@gmail.com') } });

    return result ? Result.ok(result) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async update(entity: Auth): Promise<void> {
    throw new Error();
  }

  protected entitySchema(): EntitySchema<Auth> {
    return AuthModel;
  }
}
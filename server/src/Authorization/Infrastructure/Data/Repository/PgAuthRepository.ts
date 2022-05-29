import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entity/IAuthRepository";
import { PgAuthMapper } from "Authorization/Infrastructure/Data/Mapper/PgAuthMapper";
import { Repository } from "typeorm";

@Injectable()
export class PgAuthRepository implements IAuthRepository {
  constructor(
    @Inject('AuthModelRepository')
    private typeOrmRepository: Repository<any>,
    private mapper: PgAuthMapper
  ) {}

  public async delete(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async find(filter: AuthFilter): Promise<Result<Auth[], Error>> {
    throw new Error();
  }

  public async findOne(filter: AuthFilter): Promise<Result<Auth, Error>> {
    throw new Error();
  }

  public async save(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async update(entity: Auth): Promise<void> {
    throw new Error();
  }

}
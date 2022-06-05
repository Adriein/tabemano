import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entity/IAuthRepository";
import { IAuthModel } from "Authorization/Infrastructure/Persistance/Model/IAuthModel";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { Repository } from "typeorm";

@Injectable()
export class PgAuthRepository implements IAuthRepository {
  constructor(
    @Inject('AuthModelRepository')
    private typeOrmRepository: Repository<any>,
  ) {}

  public async delete(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async find(filter: AuthFilter): Promise<Result<Auth[], Error>> {
    throw new Error();
  }

  public async findOne(filter: AuthFilter): Promise<Result<Auth, Error>> {
    const result = await this.typeOrmRepository.findOne({ where: { _email: new Email('adria.claret@gmail.com') } });
    console.log(result.checkIsAValidPassword(new Password('aaaa')));
    throw new Error();
  }

  public async save(entity: Auth): Promise<void> {
    throw new Error();
  }

  public async update(entity: Auth): Promise<void> {
    throw new Error();
  }

}
import { Inject } from "@nestjs/common";
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entity/IAuthRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler {
  constructor(@Inject('IAuthRepository') private readonly repository: IAuthRepository,) {}

  @Log()
  public async execute(command: SignInQuery): Promise<SignInResponse> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    const auth = await this.findUser(email);

    await auth.checkIsAValidPassword(password);

    return SignInResponse.fromDomain(auth);
  }

  private async findUser(email: Email): Promise<Auth> {
    const filter = new AuthFilter();

    filter.withEmail(email);

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
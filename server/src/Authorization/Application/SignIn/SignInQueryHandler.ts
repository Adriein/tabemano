import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { SignInResponse } from "Authorization/Application/SignIn/SignInResponse";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler<SignInResponse> {
  constructor(private readonly repository: IAuthRepository) {}

  public async handle(command: SignInQuery): Promise<SignInResponse> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    const auth = await this.findUser(email);

    await auth.checkIsAValidPassword(password);

    return SignInResponse.fromDomain(auth);
  }

  private async findUser(email: Email): Promise<Auth> {
    const filter = new AuthFilter();

    filter.withEmail(email);

    const result = await this.repository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value[0];
  }
}
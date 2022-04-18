import { SignInQuery } from "Authorization/Application/SignIn/SignInQuery";
import { IAuthFilter } from "Authorization/Domain/Entities/IAuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

@QueryHandler(SignInQuery)
export class SignInQueryHandler implements IQueryHandler<any> {
  constructor(private readonly repository: IAuthRepository, private readonly filter: IAuthFilter) {}

  public async handle(command: SignInQuery): Promise<void> {
    const email = new Email(command.email);
    const password = new Password(command.password);

    this.filter.withEmail(email);

    const result = await this.repository.find(this.filter);

    if(result.isError()) {
      throw result.value;
    }

    const auth = result.value[0];

    await auth.suppliedValidPassword(password);
  }
}
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { Role } from "Authorization/Domain/Entities/Role";
import { TenantAlreadyExistsError } from "Authorization/Domain/Error/TenantAlreadyExistsError";
import { Roles } from "Shared/Domain/constants";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { CommandHandler } from "Shared/Domain/Decorators/CommandHandler.decorator";
import { Log } from "Shared/Domain/Decorators/Log";
import { DomainEventsManager } from "Shared/Domain/Entities/DomainEventsManager";
import { ICommandHandler } from "Shared/Domain/Interfaces/ICommandHandler";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(RegisterTenantCommand)
export class RegisterTenantCommandHandler implements ICommandHandler {
  constructor(private readonly repository: IAuthRepository) {}

  @Log()
  public async handle(command: RegisterTenantCommand): Promise<void> {
    const name = new Name(command.name);
    const email = new Email(command.email);
    const password = new Password(command.password);
    const roleType = new RoleType(Roles.TENANT);

    const tenant = await this.findTenant(email);

    if (tenant) {
      throw new TenantAlreadyExistsError();
    }

    const role = Role.build(roleType);

    const auth = Auth.build(name, email, password, role);

    await DomainEventsManager.publishEvents(auth.id());
  }

  private async findTenant(email: Email): Promise<Auth> {
    const filter = new AuthFilter();
    filter.withEmail(email);

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
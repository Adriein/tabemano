import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { Auth } from "Authorization/Domain/Entities/Auth";
import { AuthFilter } from "Authorization/Domain/Entities/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Entities/IAuthRepository";
import { Role } from "Authorization/Domain/Entities/Role";
import { TenantAlreadyExistsError } from "Authorization/Domain/Error/TenantAlreadyExistsError";
import { FindRoleQuery } from "Backoffice/Role/Application/FindRoleQuery";
import { FindRoleResponse } from "Backoffice/Role/Application/FindRoleResponse";
import { IQueryBus } from "Shared/Domain/Bus/IQueryBus";
import { Roles, TENANT_ROLE } from "Shared/Domain/constants";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { ID } from "Shared/Domain/Vo/Id.vo";
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
  constructor(
    private readonly repository: IAuthRepository,
    private readonly queryBus: IQueryBus,
    private readonly crypto: CryptoService
  ) {}

  @Log()
  public async handle(command: RegisterTenantCommand): Promise<void> {
    const name = new Name(command.name);
    const email = new Email(command.email);
    const password = await this.crypto.hash(command.password);

    await this.ensureTenantNotExists(email);

    const role = await this.findTenantRole();

    const auth = Auth.build(name, email, new Password(password), role);

    await DomainEventsManager.publishEvents(auth.id());
  }

  private async ensureTenantNotExists(email: Email): Promise<void> {
    const filter = new AuthFilter();
    filter.withEmail(email);

    const result = await this.repository.findOne(filter);

    if (result.isOk()) {
      throw new TenantAlreadyExistsError();
    }
  }

  private async findTenantRole(): Promise<Role> {
    const query = new FindRoleQuery(TENANT_ROLE);

    const role = await this.queryBus.ask<FindRoleResponse>(query);

    return new Role(
      new ID(role.id),
      new RoleType(role.type)
    );
  }
}
import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, EventPublisher, ICommandHandler, QueryBus } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Filter/AuthFilter";
import { IAuthRepository } from "Authorization/Domain/Repository/IAuthRepository";
import { Role } from "Authorization/Domain/Entity/Role";
import { TenantAlreadyExistsError } from "Authorization/Domain/Error/TenantAlreadyExistsError";
import { FindRoleQuery } from "Backoffice/Role/Application/FindRoleQuery";
import { FindRoleResponse } from "Backoffice/Role/Application/FindRoleResponse";
import { TENANT_ROLE } from "Shared/Domain/constants";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

@CommandHandler(RegisterTenantCommand)
export class RegisterTenantCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IAuthRepository')
    private readonly repository: IAuthRepository,
    private readonly queryBus: QueryBus,
    private readonly crypto: CryptoService,
    private readonly eventBus: EventBus,
  ) {}

  @Log()
  public async execute(command: RegisterTenantCommand): Promise<void> {
    const name = new Name(command.name);
    const email = new Email(command.email);
    const password = await this.crypto.hash(command.password);

    await this.ensureTenantNotExists(email);

    const role = await this.findTenantRole();

    const auth = Auth.build(name, email, new Password(password), new ID(role.id));

    this.publishTenantRegisteredEvent(auth);
  }

  private async ensureTenantNotExists(email: Email): Promise<void> {
    const filter = new AuthFilter();
    filter.withEmail(email);

    const result = await this.repository.findOne(filter);

    if (result.isOk) {
      throw new TenantAlreadyExistsError();
    }
  }

  private async findTenantRole(): Promise<FindRoleResponse> {
    const query = new FindRoleQuery(TENANT_ROLE);

    return await this.queryBus.execute<FindRoleQuery, FindRoleResponse>(query);
  }

  private publishTenantRegisteredEvent(auth: Auth): void {
    this.eventBus.publish(TenantCreatedDomainEvent.fromEntity(auth));
  }
}
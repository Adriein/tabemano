import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Filter/AuthFilter";
import { RoleFilter } from "Authorization/Domain/Filter/RoleFilter";
import { IAuthRepository } from "Authorization/Domain/Repository/IAuthRepository";
import { Role } from "Authorization/Domain/Entity/Role";
import { TenantAlreadyExistsError } from "Authorization/Domain/Error/TenantAlreadyExistsError";
import { IRoleRepository } from "Authorization/Domain/Repository/IRoleRepository";
import { TENANT_ROLE } from "Shared/Domain/constants";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@CommandHandler(RegisterTenantCommand)
export class RegisterTenantCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IAuthRepository')
    private readonly authRepository: IAuthRepository,
    @Inject('IRoleRepository')
    private readonly roleRepository: IRoleRepository,
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

    const auth = Auth.build(name, email, new Password(password), role.id());

    this.publishTenantRegisteredEvent(auth);
  }

  private async ensureTenantNotExists(email: Email): Promise<void> {
    const filter = AuthFilter.builder().withEmail(email);

    const result = await this.authRepository.findOne(filter);

    if (result.isOk) {
      throw new TenantAlreadyExistsError();
    }
  }

  private async findTenantRole(): Promise<Role> {
    const filter = RoleFilter.builder().withRoleType(new RoleType(TENANT_ROLE));
    const result = await this.roleRepository.findOne(filter);

    return result.unwrap();
  }

  private publishTenantRegisteredEvent(auth: Auth): void {
    this.eventBus.publish(TenantCreatedDomainEvent.fromEntity(auth));
  }
}
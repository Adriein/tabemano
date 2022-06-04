import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { RegisterClientCommand } from "Backoffice/Tenant/Application/RegisterClient/RegisterClientCommand";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

@CommandHandler(RegisterClientCommand)
export class RegisterClientCommandHandler implements ICommandHandler {
  constructor(private readonly repository: ITenantRepository) {}

  @Log()
  public async execute(command: RegisterClientCommand): Promise<void> {
    const tenantId = new ID(command.tenantId);
    const name = new Name(command.name);
    const email = new Email(command.email);
    const pricingId = new ID(command.pricingId);
    const roleId = new ID(command.roleId);

    const filter = UserFilter.builder().withId(tenantId);

    const result = await this.repository.findOne(filter);

    const tenant = result.unwrap();

    tenant.registerClient(name, email, pricingId, roleId);
  }
}
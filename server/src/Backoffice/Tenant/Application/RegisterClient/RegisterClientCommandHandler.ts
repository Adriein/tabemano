import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { RegisterClientCommand } from "Backoffice/Tenant/Application/RegisterClient/RegisterClientCommand";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { CommandHandler } from "Shared/Domain/Decorators/CommandHandler.decorator";
import { ICommandHandler } from "Shared/Domain/Interfaces/ICommandHandler";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

@CommandHandler(RegisterClientCommand)
export class RegisterClientCommandHandler implements ICommandHandler {
  constructor(private readonly repository: ITenantRepository) {}

  public async handle(command: RegisterClientCommand): Promise<void> {
    const tenantId = new ID(command.tenantId);
    const name = new Name(command.name);
    const email = new Email(command.email);
    const pricingId = new ID(command.pricingId);
    const roleId = new ID(command.roleId);

    const filter = UserFilter.builder().withId(tenantId);

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    const tenant = result.value;

    tenant.registerClient(name, email, pricingId, roleId);
  }

}
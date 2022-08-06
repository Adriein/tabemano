import { Inject } from "@nestjs/common";
import { CommandHandler, EventBus, ICommandHandler } from "@nestjs/cqrs";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ClientRegisteredDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientRegisteredDomainEvent";
import { RegisterClientCommand } from "Backoffice/Tenant/Application/RegisterClient/RegisterClientCommand";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

@CommandHandler(RegisterClientCommand)
export class RegisterClientCommandHandler implements ICommandHandler {
  constructor(
    @Inject('ITenantRepository') private readonly repository: ITenantRepository,
    private readonly eventBus: EventBus,
  ) {}

  @Log()
  public async execute(command: RegisterClientCommand): Promise<void> {
    const tenantId = new ID(command.tenantId);
    const name = new Name(command.name);
    const email = new Email(command.email);
    const pricingId = new ID(command.pricingId);
    const roleId = new ID(command.roleId);

    const tenant = await this.getTenant(tenantId);

    const client = tenant.registerClient(name, email, pricingId, roleId);

    const pricing = tenant.getAvailablePricing();

    await this.eventBus.publish(new ClientRegisteredDomainEvent(
      client.id(),
      client.name(),
      client.email(),
      tenant.id(),
      pricing.getPricingById(pricingId),
      roleId
    ));
  }

  private async getTenant(tenantId: ID): Promise<Tenant> {
    const filter = UserFilter.create().withId(tenantId);

    const result = await this.repository.findOne(filter);

    return result.unwrap();
  }
}
import { Inject } from "@nestjs/common";
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { ConfigureTenantCommand } from "Backoffice/Tenant/Application/ConfigureTenant/ConfigureTenantCommand";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

@CommandHandler(ConfigureTenantCommand)
export class ConfigureTenantCommandHandler implements ICommandHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly repository: ITenantRepository,
  ) {}

  public async execute(command: ConfigureTenantCommand): Promise<void> {
    const tenantId = new ID(command.tenantId);
    const notificationEmail = new Email(command.notificationEmail);

    const tenant = await this.findTenant(tenantId);

    await this.configureNotificationEmail(tenant, notificationEmail)

  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withId(id);

    const response = await this.repository.findOne(filter);

    return response.unwrap();
  }

  private async configureNotificationEmail(tenant: Tenant, email: Email): Promise<void> {
    tenant.configureNotificationEmail(email);

    await this.repository.update(tenant);
  }
}
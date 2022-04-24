import { TenantCreatedDomainEvent } from "Authorization/Application/RegisterTenant/TenantCreatedDomainEvent";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Entities/ITenantRepository";
import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { Roles } from "Shared/Domain/constants";
import { DomainEventsHandler } from "Shared/Domain/Decorators/DomainEventsHandler.decorator";
import { Log } from "Shared/Domain/Decorators/Log";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { RoleType } from "Shared/Domain/Vo/RoleType";

@DomainEventsHandler(TenantCreatedDomainEvent)
export class CreateTenantDomainEventHandler implements IDomainEventHandler {
  constructor(private readonly repository: ITenantRepository) {}

  @Log()
  public async handle(event: TenantCreatedDomainEvent): Promise<void> {
    const { name, email, password, roleId } = event;

    const admin = await this.findAdmin();

    const tenant = Tenant.build(name, password, email, admin.id(), roleId);

    await this.repository.save(tenant);
  }

  private async findAdmin(): Promise<Tenant> {
    const filter = new UserFilter();
    filter.withRole(new RoleType(Roles.ADMIN));

    const result = await this.repository.findOne(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }
}
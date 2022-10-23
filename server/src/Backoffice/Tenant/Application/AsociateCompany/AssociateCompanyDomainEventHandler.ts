import { Inject } from "@nestjs/common";
import { EventsHandler } from "@nestjs/cqrs";
import { CompanyRegisteredDomainEvent } from "Backoffice/Company/Application/RegisterCompany/CompanyRegisteredDomainEvent";
import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { ITenantCompanyRepository } from "Backoffice/Tenant/Domain/Repository/ITenantCompanyRepository";
import { ITenantRepository } from "Backoffice/Tenant/Domain/Repository/ITenantRepository";
import { Log } from "Shared/Domain/Decorators/Log";
import { IDomainEventHandler } from "Shared/Domain/Interfaces/IDomainEventHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";

@EventsHandler(CompanyRegisteredDomainEvent)
export class AssociateCompanyDomainEventHandler implements IDomainEventHandler {
  constructor(
    @Inject('ITenantRepository')
    private readonly tenantRepository: ITenantRepository,
    @Inject('ITenantCompanyRepository')
    private readonly tenantCompanyRepository: ITenantCompanyRepository
  ) {}

  @Log()
  public async handle(event: CompanyRegisteredDomainEvent): Promise<void> {
    const tenant = await this.findTenant(event.tenantId);

    tenant.associateCompany(event.aggregateId);
    
    await this.tenantCompanyRepository.save(tenant);
  }

  private async findTenant(id: ID): Promise<Tenant> {
    const filter = TenantFilter.create().withId(id);

    const result = await this.tenantRepository.findOne(filter);

    return result.unwrap();
  }

}
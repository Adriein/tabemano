import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ITenantCompanyRepository extends IRepository<Tenant> {
  save(entity: Tenant): Promise<void>;
}
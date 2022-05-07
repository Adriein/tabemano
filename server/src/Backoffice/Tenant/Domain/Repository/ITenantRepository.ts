import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ITenantRepository extends IRepository<Tenant> {}
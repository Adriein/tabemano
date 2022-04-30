import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ITenantRepository extends IRepository<Tenant> {}
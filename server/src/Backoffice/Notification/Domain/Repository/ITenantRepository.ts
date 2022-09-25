import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ITenantRepository extends IRepository<Tenant> {}
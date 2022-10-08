import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";

export interface IVerifyTenantEmailService {
  verify(tenant: Tenant): Promise<void>;
}
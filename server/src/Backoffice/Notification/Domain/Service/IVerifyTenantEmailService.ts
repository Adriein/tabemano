import { Result } from "@badrap/result";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { ExternalServiceError } from "Shared/Domain/Error/ExternalServiceError";

export interface IVerifyTenantEmailService {
  verify(tenant: Tenant): Promise<Result<null, ExternalServiceError>>;
}
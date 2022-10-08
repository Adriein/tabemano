import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { IVerifyTenantEmailService } from "Backoffice/Notification/Domain/Service/IVerifyTenantEmailService";

export interface IThirdPartySmtpServiceAbstractFactory {
  createVerifyTenantEmailService(): IVerifyTenantEmailService;

  createSmtpService(): ISmtpService;
}
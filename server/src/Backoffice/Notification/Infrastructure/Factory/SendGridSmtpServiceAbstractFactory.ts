import { IThirdPartySmtpServiceAbstractFactory } from "Backoffice/Notification/Domain/Factory/IThirdPartySmtpServiceAbstractFactory";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import { IVerifyTenantEmailService } from "Backoffice/Notification/Domain/Service/IVerifyTenantEmailService";
import { SendGridSmtpService } from "Backoffice/Notification/Infrastructure/Service/SendGridSmtpService";
import { SendGridVerifyTenantEmailService } from "Backoffice/Notification/Infrastructure/Service/SendGridVerifyTenantEmailService";

export class SendGridSmtpServiceAbstractFactory implements IThirdPartySmtpServiceAbstractFactory {
  constructor(
    private readonly smtpService: SendGridSmtpService,
    private readonly verifyEmailService: SendGridVerifyTenantEmailService,
  ) {}

  public createSmtpService(): ISmtpService {
    return this.smtpService;
  }

  public createVerifyTenantEmailService(): IVerifyTenantEmailService {
    return this.verifyEmailService;
  }
}
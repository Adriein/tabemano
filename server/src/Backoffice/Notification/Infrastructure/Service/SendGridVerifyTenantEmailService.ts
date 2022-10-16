import { Tenant } from 'Backoffice/Notification/Domain/Entity/Tenant';
import { IVerifyTenantEmailService } from 'Backoffice/Notification/Domain/Service/IVerifyTenantEmailService';
import {
  SendGridVerifyEmailDto,
  VerifyTenantEmailRequest
} from 'Backoffice/Notification/Infrastructure/Dto/VerifyTenantEmailRequest';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';
import { SendGridRequest } from "Shared/Infrastructure/Service/SendGrid/SendGridRequest";

export class SendGridVerifyTenantEmailService implements IVerifyTenantEmailService {
  constructor(private readonly sendGrid: SendGridClient) {}

  public async verify(tenant: Tenant): Promise<void> {
    const data = new VerifyTenantEmailRequest(tenant);

    const request = new SendGridRequest<SendGridVerifyEmailDto>(
      '/v3/verified_senders',
      'POST',
      data.serialize()
    );

    await this.sendGrid.makeRequest<SendGridRequest<SendGridVerifyEmailDto>, void>(request);
  }
}

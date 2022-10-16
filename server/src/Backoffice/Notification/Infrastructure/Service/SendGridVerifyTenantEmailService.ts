import { Tenant } from 'Backoffice/Notification/Domain/Entity/Tenant';
import { IVerifyTenantEmailService } from 'Backoffice/Notification/Domain/Service/IVerifyTenantEmailService';
import { VerifyTenantEmailRequest } from 'Backoffice/Notification/Infrastructure/Dto/VerifyTenantEmailRequest';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';

export class SendGridVerifyTenantEmailService implements IVerifyTenantEmailService {
  constructor(private readonly sendGrid: SendGridClient) {}

  public async verify(tenant: Tenant): Promise<void> {
    const data = new VerifyTenantEmailRequest(tenant);

    const request = {
      url: `/v3/verified_senders`,
      method: 'POST',
      body: data.serialize(),
    };

    await this.sendGrid.makeRequest(request);
  }
}

import { Result } from "@badrap/result";
import { Injectable } from "@nestjs/common";
import { Tenant } from 'Backoffice/Notification/Domain/Entity/Tenant';
import { IVerifyTenantEmailService } from 'Backoffice/Notification/Domain/Service/IVerifyTenantEmailService';
import {
  SendGridVerifyEmailDto,
  VerifyTenantEmailRequest
} from 'Backoffice/Notification/Infrastructure/Dto/VerifyTenantEmailRequest';
import { ExternalServiceError } from "Shared/Domain/Error/ExternalServiceError";
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';
import { SendGridRequest } from "Shared/Infrastructure/Service/SendGrid/SendGridRequest";

@Injectable()
export class SendGridVerifyTenantEmailService implements IVerifyTenantEmailService {
  constructor(private readonly sendGrid: SendGridClient) {}

  public async verify(tenant: Tenant): Promise<Result<null, ExternalServiceError>> {
    const data = new VerifyTenantEmailRequest(tenant);

    const request = new SendGridRequest<SendGridVerifyEmailDto>(
      '/v3/verified_senders',
      'POST',
      data.serialize()
    );

    const response = await this.sendGrid.makeRequest<SendGridRequest<SendGridVerifyEmailDto>, void>(request);

    if (response.meta.success) {
      return Result.err(new ExternalServiceError(response.meta.error!.message));
    }

    return Result.ok(null);
  }
}

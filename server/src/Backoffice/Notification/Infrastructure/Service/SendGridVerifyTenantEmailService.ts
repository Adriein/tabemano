import { Result } from "@badrap/result";
import { Injectable } from "@nestjs/common";
import { Tenant } from 'Backoffice/Notification/Domain/Entity/Tenant';
import { IVerifyTenantEmailService } from 'Backoffice/Notification/Domain/Service/IVerifyTenantEmailService';
import { VerifyTenantEmailErrorResponse } from "Backoffice/Notification/Infrastructure/Dto/VerifyTenantEmail/VerifyTenantEmailErrorResponse";
import {
  SendGridVerifyEmailDto,
  VerifyTenantEmailRequest
} from 'Backoffice/Notification/Infrastructure/Dto/VerifyTenantEmail/VerifyTenantEmailRequest';
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

    if (!response.meta.success) {
      const specificError = this.formatVerifyTenantEmailErrorResponse(response.meta.error as unknown as VerifyTenantEmailErrorResponse);
      return Result.err(new ExternalServiceError(`${response.meta.error!.message} -> ${specificError}`));
    }

    return Result.ok(null);
  }

  private formatVerifyTenantEmailErrorResponse(error: VerifyTenantEmailErrorResponse): string {
    const message: string[] = [];
    error.response.body.errors.forEach((
      error: { field: string, message: string }
    ) => {
      message.push(`${error.field} ${error.message}`)
    }, []);

    return message.join(' ');
  }
}

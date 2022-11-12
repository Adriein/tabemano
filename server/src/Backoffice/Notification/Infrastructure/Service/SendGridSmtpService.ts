import { Email } from 'Backoffice/Shared/Domain/Email/Email';
import { ISmtpService } from 'Backoffice/Notification/Domain/Service/ISmtpService';
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import {
  SendEmailRequest,
  SendEmailRequestDto,
} from 'Backoffice/Notification/Infrastructure/Dto/SendEmail/SendEmailRequest';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';
import { SendGridRequest } from 'Shared/Infrastructure/Service/SendGrid/SendGridRequest';
import { Inject, Injectable } from '@nestjs/common';
import { SENDGRID } from 'Shared/Domain/constants';
import { SendEmailErrorResponse } from '../Dto/SendEmail/SendEmailErrorResponse';
import { Result } from '@badrap/result';
import { ExternalServiceError } from 'Shared/Domain/Error/ExternalServiceError';

@Injectable()
export class SendGridSmtpService implements ISmtpService {
  constructor(@Inject(SENDGRID) private readonly sendGrid: SendGridClient) {}

  public async send(email: Email): Promise<Result<null, ExternalServiceError>> {
    const data = new SendEmailRequest(email);

    const request = new SendGridRequest<SendEmailRequestDto>(
      '/v3/mail/send',
      'POST',
      data.serialize()
    );

    const response = await this.sendGrid.makeRequest<SendGridRequest, void>(request);

    if (!response.meta.success) {
      const specificError = this.formatSendGridSmtpErrorResponse(
        response.meta.error as unknown as SendEmailErrorResponse
      );

      return Result.err(
        new ExternalServiceError(`${response.meta.error!.message} -> ${specificError}`)
      );
    }

    return Result.ok(null);
  }

  private formatSendGridSmtpErrorResponse(error: SendEmailErrorResponse): string {
    const message: string[] = [];

    error.response.body.errors.forEach((error: { field: string; message: string }) => {
      message.push(`${error.field} -> ${error.message}`);
    }, []);

    return message.join(' ');
  }
}

import { Email } from 'Backoffice/Notification/Domain/Entity/Email';
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

@Injectable()
export class SendGridSmtpService implements ISmtpService {
  constructor(@Inject(SENDGRID) private readonly sendGrid: SendGridClient) {}

  public async send(email: Email): Promise<void> {
    const data = new SendEmailRequest(email);

    const request = new SendGridRequest<SendEmailRequestDto>(
      '/v3/mail/send',
      'POST',
      data.serialize()
    );

    const response = await this.sendGrid.makeRequest<SendGridRequest, void>(request);

    // Handle error
    console.log('RESPONSE', response);
  }
}

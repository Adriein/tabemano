import { Email } from "Backoffice/Notification/Domain/Entity/Email";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import sgMail, { MailDataRequired } from '@sendgrid/mail';
import {
  SendEmailRequest,
  SendEmailRequestDto
} from "Backoffice/Notification/Infrastructure/Dto/SendEmail/SendEmailRequest";
import { SendGridClient } from "Shared/Infrastructure/Service/SendGrid/SendGridClient";
import { SendGridRequest } from "Shared/Infrastructure/Service/SendGrid/SendGridRequest";

export class SendGridSmtpService implements ISmtpService {
  constructor(
    private readonly client: SendGridClient
  ) {}

  public async send(email: Email): Promise<void> {
    const data = new SendEmailRequest(email);

    const request = new SendGridRequest<SendEmailRequestDto>(
      '/v3/mail/send',
      'POST',
      data.serialize()
    );
  }
}
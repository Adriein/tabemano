import { Email } from "Backoffice/Notification/Domain/Entity/Email";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";
import sgMail, { MailDataRequired } from '@sendgrid/mail';

export class SendGridSmtpService implements ISmtpService {
  constructor() {
    sgMail.setApiKey(process.env.SEND_GRID_API_KEY!);
  }

  public async send(email: Email): Promise<void> {
    return Promise.resolve(undefined);
  }
}
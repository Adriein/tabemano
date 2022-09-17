import { Email } from "Backoffice/Notification/Domain/Entity/Email";
import { ISmtpService } from "Backoffice/Notification/Domain/Service/ISmtpService";

export class SendGridSmtpService implements ISmtpService {
  public async send(email: Email): Promise<void> {
    return Promise.resolve(undefined);
  }

}
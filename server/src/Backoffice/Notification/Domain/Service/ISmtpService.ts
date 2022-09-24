import { Email } from "Backoffice/Notification/Domain/Entity/Email";

export interface ISmtpService {
  send(email: Email): Promise<void>;
}
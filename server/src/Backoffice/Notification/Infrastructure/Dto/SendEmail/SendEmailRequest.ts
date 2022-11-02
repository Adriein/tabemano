import { Email } from "Backoffice/Notification/Domain/Entity/Email";

export type SendEmailRequestDto = {
  personalizations: any[],
  from: string,
  subject: string,
  content: string,
}

export class SendEmailRequest {
  constructor(private readonly email: Email) {}

  public serialize(): SendEmailRequestDto {
    return {
      personalizations: [],
      from: this.email.from().value,
      subject: this.email.subject(),
      content: this.email.content()
    }
  }
}
import { Email } from 'Backoffice/Notification/Domain/Entity/Email';

export type SendEmailRequestDto = {
  personalizations: { to: { email: string }[] }[];
  from: { email: string };
  subject: string;
  content: { type: string; value: string }[];
};

export class SendEmailRequest {
  constructor(private readonly email: Email) {}

  public serialize(): SendEmailRequestDto {
    const to = this.email.to().map(email => {
      return { email: email.value };
    });

    return {
      personalizations: [{ to }],
      from: { email: this.email.from().value },
      subject: this.email.subject(),
      content: [{ type: 'text/html', value: this.email.content() }],
    };
  }
}

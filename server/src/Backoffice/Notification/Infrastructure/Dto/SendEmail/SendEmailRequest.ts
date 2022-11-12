import { Email } from 'Backoffice/Shared/Domain/Email/Email';

export type SendEmailRequestDto = {
  personalizations: { to: { email: string }[] }[];
  from: { email: string };
  subject: string;
  content: { type: string; value: string }[];
};

export class SendEmailRequest {
  constructor(private readonly email: Email) {}

  public serialize(): SendEmailRequestDto {
    return {
      personalizations: [ { to: [ { email: this.email.to().value } ] } ],
      from: { email: this.email.from().value },
      subject: this.email.subject(),
      content: [ { type: 'text/html', value: this.email.content() } ],
    };
  }
}

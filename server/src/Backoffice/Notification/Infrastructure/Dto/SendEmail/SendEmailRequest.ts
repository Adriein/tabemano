import { TRACKING_TYPE } from "Backoffice/Shared/constants";
import { Email } from 'Backoffice/Shared/Domain/Email/Email';

export type SendEmailRequestDto = {
  personalizations: { to: { email: string }[] }[];
  from: { email: string };
  subject: string;
  content: { type: string; value: string }[];
  tracking_settings?: {
    click_tracking: {
      enable: boolean,
      enable_text: boolean,
    }
  }
};

export class SendEmailRequest {
  constructor(private readonly email: Email) {}

  public serialize(): SendEmailRequestDto {
    return {
      personalizations: [ { to: [ { email: this.email.to().value } ] } ],
      from: { email: this.email.from().value },
      subject: this.email.subject(),
      content: [ { type: 'text/html', value: this.email.content() } ],
      ...(this.email.hasTracking() && { tracking_settings: this.enableTracking() })
    };
  }

  private enableTracking(): SendEmailRequestDto['tracking_settings'] {
    if (this.email.trackingType() === TRACKING_TYPE.click)
      return {
        click_tracking: {
          enable: true, enable_text: true
        }
      }
  }
}

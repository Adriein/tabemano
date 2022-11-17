import { TRACKING_TYPE, TrackingType } from "Backoffice/Shared/constants";
import { Content } from 'Backoffice/Shared/Domain/Email/Content';
import { Heading } from 'Backoffice/Shared/Domain/Email/Heading';
import { Tracking } from "Backoffice/Shared/Domain/Email/Tracking";
import { Email as EmailVo } from 'Shared/Domain/Vo/Email.vo';

export class Email {
  public static verification(from: EmailVo, to: EmailVo): Email {
    return new Email(
      new Heading(
        from,
        to,
        'Verify your email'
      ),
      new Content(
        '<a target="#" href="https://ce4d-83-40-159-134.eu.ngrok.io/api/v1/confirm">Click aquí para verificar tu' +
        ' cuenta</a>'
      ),
      new Tracking(TRACKING_TYPE.click)
    );
  }

  constructor(
    private readonly _heading: Heading,
    private readonly _content: Content,
    private readonly _tracking?: Tracking
  ) {}

  public from(): EmailVo {
    return this._heading.from();
  }

  public to(): EmailVo {
    return this._heading.to();
  }

  public subject(): string {
    return this._heading.subject();
  }

  public carbonCopy(): EmailVo[] | undefined {
    return this._heading.carbonCopy();
  }

  public blindCarbonCopy(): EmailVo[] | undefined {
    return this._heading.blindCarbonCopy();
  }

  public content(): string {
    return this._content.content();
  }


  public hasTracking(): boolean {
    return !!this._tracking;
  }

  public trackingType(): TrackingType | undefined {
    return this._tracking?.type();
  }
}

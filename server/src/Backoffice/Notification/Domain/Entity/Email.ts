import { Content } from 'Backoffice/Notification/Domain/Entity/Content';
import { Heading } from 'Backoffice/Notification/Domain/Entity/Heading';
import { Email as EmailVo } from 'Shared/Domain/Vo/Email.vo';

export class Email {
  constructor(private readonly _heading: Heading, private readonly _content: Content) {}

  public from(): EmailVo {
    return this._heading.from();
  }

  public to(): EmailVo[] {
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
}

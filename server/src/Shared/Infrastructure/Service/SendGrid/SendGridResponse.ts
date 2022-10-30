import { SendGridMetadata } from './SendGridMetadata';

export class SendGridResponse<T> {
  constructor(private readonly _meta: SendGridMetadata, private readonly _body?: T) {}

  public meta(): SendGridMetadata {
    return this._meta;
  }

  public body(): T | undefined {
    return this._body;
  }
}

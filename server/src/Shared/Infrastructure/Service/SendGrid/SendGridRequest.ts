import { HttpMethod } from 'Shared/Domain/constants';

export class SendGridRequest {
  constructor(private readonly _url: string, private readonly _method: keyof HttpMethod) {}

  public get url(): string {
    return this._url;
  }

  public get method(): keyof HttpMethod {
    return this._method;
  }
}

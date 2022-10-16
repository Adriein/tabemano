import { HttpMethod } from 'Shared/Domain/constants';

export class SendGridRequest<Body = any> {
  constructor(
    private readonly _url: string,
    private readonly _method: keyof HttpMethod,
    private readonly _body?: Body
  ) {}

  public get url(): string {
    return this._url;
  }

  public get method(): keyof HttpMethod {
    return this._method;
  }


  public get body(): Body | undefined {
    return this._body;
  }
}

import ResponseError from "@sendgrid/helpers/classes/response-error";

export class SendGridMetadata {
  constructor(private readonly _success: boolean, private readonly _error?: ResponseError) {}

  public get success(): boolean {
    return this._success;
  }

  public get error(): ResponseError | undefined {
    return this._error;
  }
}

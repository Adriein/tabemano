export class SendGridMetadata {
  constructor(private readonly _success: boolean, private readonly _error?: Error) {}

  public success(): boolean {
    return this._success;
  }

  public error(): Error | undefined {
    return this._error;
  }
}

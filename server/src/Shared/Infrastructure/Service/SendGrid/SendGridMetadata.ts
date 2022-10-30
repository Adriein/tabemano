export class SendGridMetadata {
  constructor(private readonly _success: boolean, private readonly _error?: Error) {}

  public get success(): boolean {
    return this._success;
  }

  public get error(): Error | undefined {
    return this._error;
  }
}

export class SendGridRemainingCreditResponse {
  constructor(private readonly _remain: number) {}

  public get remain(): number {
    return this._remain;
  }
}

export class SendGridRemainingCreditResponse {
  constructor(private readonly _remain: number) {}

  public remain(): number {
    return this._remain;
  }
}

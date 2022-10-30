export class RemainingCreditResponse {
  constructor(private readonly _remainingCredit: number) {}

  public remainingCredit(): number {
    return this._remainingCredit;
  }
}

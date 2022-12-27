export class UpdatePaymentAttemptCommand {
  constructor(
    private readonly _paymentAttemptId: string,
  ) {}

  public get paymentAttemptId(): string {
    return this._paymentAttemptId;
  }
}
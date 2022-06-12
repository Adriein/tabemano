export abstract class Tax {
  public abstract readonly type: string
  public abstract readonly percentage: number

  private _total: number = 0;

  public calculate(baseAmount: number): void {
    this._total = (baseAmount * this.percentage) / 100;
  }

  public get total(): number {
    return this._total;
  }
}
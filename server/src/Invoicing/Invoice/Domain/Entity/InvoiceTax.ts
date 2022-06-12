import { Tax } from "Invoicing/Invoice/Domain/Entity/Tax";

export class InvoiceTax {
  constructor(
    readonly baseAmount: number,
    readonly tax: Tax[],
  ) {}

  public total(): number {
    return this.tax.reduce((total: number, tax: Tax) => {
      tax.calculate(this.baseAmount);

      return total + tax.total;
    }, 0)
  }
}
import { Tax } from "Invoicing/Invoice/Domain/Entity/Tax";
import { Money } from "Shared/Domain/Entities/Money";

export class InvoiceTax {
  constructor(
    readonly baseAmount: Money,
    readonly tax: Tax[],
  ) {}

  public total(): number {
    return this.tax.reduce((total: number, tax: Tax) => {
      tax.calculate(this.baseAmount.amount().value);

      return total + tax.total;
    }, 0)
  }
}
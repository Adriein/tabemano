import { Money } from "Shared/Domain/Entities/Money";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class InvoiceRow {
  public static build(
    invoiceId: ID,
    description: string,
    quantity: number,
    price: Money,
  ): InvoiceRow {
    const total = price.amount().value * quantity;

    return new InvoiceRow(ID.generate(), invoiceId, description, quantity, price, total);
  }

  constructor(
    readonly id: ID,
    readonly invoiceId: ID,
    readonly description: string,
    readonly quantity: number,
    readonly price: Money,
    readonly total: number,
  ) {}
}
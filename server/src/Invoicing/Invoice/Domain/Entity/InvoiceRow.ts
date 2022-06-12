import { ID } from "Shared/Domain/Vo/Id.vo";

export class InvoiceRow {
  public static build(
    invoiceId: ID,
    description: string,
    quantity: number,
    price: number,
    total: number
  ): InvoiceRow {
    return new InvoiceRow(ID.generate(), invoiceId, description, quantity, price, total);
  }

  constructor(
    readonly id: ID,
    readonly invoiceId: ID,
    readonly description: string,
    readonly quantity: number,
    readonly price: number,
    readonly total: number
  ) {}
}
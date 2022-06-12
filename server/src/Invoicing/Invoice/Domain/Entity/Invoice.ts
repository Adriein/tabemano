import { InvoiceRow } from "Invoicing/Invoice/Domain/Entity/InvoiceRow";
import { InvoiceTax } from "Invoicing/Invoice/Domain/Entity/InvoiceTax";
import { InvoiceNumber } from "Invoicing/Invoice/Domain/Vo/InvoiceNumber";
import { Client } from "Invoicing/Shared/Domain/Client";
import { Company } from "Invoicing/Shared/Domain/Company";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";


export class Invoice extends Aggregate {
  public static build(occurred: DateVo, company: Company, client: Client, invoiceTax: InvoiceTax): Invoice {
    return new Invoice(
      ID.generate(),
      InvoiceNumber.generate(),
      occurred,
      company,
      client,
      [],
      invoiceTax,
      new Date(),
      new Date()
    );
  }

  constructor(
    readonly id: ID,
    readonly invoiceNumber: InvoiceNumber,
    readonly transactionOccurred: DateVo,
    readonly company: Company,
    readonly client: Client,
    readonly rows: InvoiceRow[],
    readonly tax: InvoiceTax,
    readonly createdAt: Date,
    readonly updatedAt: Date,
  ) {
    super(id, createdAt, updatedAt);
  }
}
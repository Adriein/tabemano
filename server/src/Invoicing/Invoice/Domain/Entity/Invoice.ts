import { Company } from "Invoicing/Invoice/Domain/Dto/Company";
import { InvoiceRow } from "Invoicing/Invoice/Domain/Entity/InvoiceRow";
import { InvoiceTax } from "Invoicing/Invoice/Domain/Entity/InvoiceTax";
import { InvoiceNumber } from "Invoicing/Invoice/Domain/Vo/InvoiceNumber";
import { Client } from "Invoicing/Shared/Domain/Client";
import { MARKET } from "Shared/Domain/constants";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Money } from "Shared/Domain/Entities/Money";
import { Currency } from "Shared/Domain/Vo/Currency.vo";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";

export class Invoice extends AggregateRoot {
  public invoiceTax?: InvoiceTax;

  public static build(occurred: DateVo, company: Company, client: Client): Invoice {
    const invoice = new Invoice(
      ID.generate(),
      InvoiceNumber.generate(),
      occurred,
      company,
      client,
      [],
      new Date(),
      new Date()
    );

    invoice.constructRows();
    invoice.addTaxes();

    return invoice;
  }

  constructor(
    _id: ID,
    private _invoiceNumber: InvoiceNumber,
    private _transactionOccurred: DateVo,
    private _company: Company,
    private _client: Client,
    private _rows: InvoiceRow[],
    _createdAt?: Date,
    _updatedAt?: Date,
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  private constructRows(): void {
    for (const subscription of this._client.subscriptions) {
      this.addRow(subscription.pricingName, 1, subscription.pricingAmount)
    }
  }

  private addRow(description: string, quantity: number, price: Money): void {
    const row = InvoiceRow.build(this.id(), description, quantity, price);

    this._rows.push(row);
  }

  private addTaxes(): void {
    switch (this._company.country.value) {
      case MARKET.ES:
        this.invoiceTax = InvoiceTax.spanishMarket(this.baseAmount());
        break;
      default:
        this.invoiceTax = InvoiceTax.spanishMarket(this.baseAmount());
    }
  }

  private baseAmount(): Money {
    const baseAmount = this._rows.reduce((total: number, row: InvoiceRow) => {
      return row.total + total;
    }, 0);

    return new Money(new NumberVo(baseAmount), new Currency('EUR'))
  }
}
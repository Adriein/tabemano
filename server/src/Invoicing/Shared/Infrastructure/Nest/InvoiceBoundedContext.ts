import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { InvoiceModule } from "Invoicing/Invoice/Infrastructure/Nest/InvoiceModule";

@Module({
  imports: [ CqrsModule, InvoiceModule ],
  controllers: [],
  providers: [],
  exports: [ CqrsModule, InvoiceModule ],
})
export class InvoiceBoundedContext {}
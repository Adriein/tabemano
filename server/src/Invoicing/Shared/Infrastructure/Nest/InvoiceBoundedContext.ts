import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CompanyModule } from "Invoicing/Company/Infrastructure/Nest/CompanyModule";
import { InvoiceModule } from "Invoicing/Invoice/Infrastructure/Nest/InvoiceModule";

@Module({
  imports: [ CqrsModule, InvoiceModule, CompanyModule ],
  controllers: [],
  providers: [],
  exports: [ CqrsModule, InvoiceModule, CompanyModule ],
})
export class InvoiceBoundedContext {}
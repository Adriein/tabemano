import { Module } from "@nestjs/common";
import { CqrsModule, QueryBus } from "@nestjs/cqrs";
import { CreateInvoiceCommandHandler } from "Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommandHandler";
import { CreateInvoiceController } from "Invoicing/Invoice/Infrastructure/Controller/CreateInvoice/CreateInvoiceController";
import { PgInvoiceRepository } from "Invoicing/Invoice/Infrastructure/Persistance/Repository/PgInvoiceRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ CreateInvoiceCommandHandler ];
const Controllers = [ CreateInvoiceController ];
const Repository = [
  {
    provide: 'InvoiceRepository',
    useClass: PgInvoiceRepository
  },
  {
    provide: 'IQueryBus',
    useClass: QueryBus
  }
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Controllers,
    ...Repository
  ],
  exports: [],
})
export class InvoiceModule {}
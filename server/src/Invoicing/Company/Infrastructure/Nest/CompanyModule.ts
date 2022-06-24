import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { FindCompanyQueryHandler } from "Invoicing/Company/Application/FindCompany/FindCompanyQueryHandler";

const Handlers = [ FindCompanyQueryHandler ];

@Module({
  imports: [ CqrsModule ],
  controllers: [],
  providers: [
    ...Handlers,
  ],
  exports: [],
})
export class CompanyModule {}
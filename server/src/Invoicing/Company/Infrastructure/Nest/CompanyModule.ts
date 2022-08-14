import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { FindCompanyQueryHandler } from "Invoicing/Company/Application/FindCompany/FindCompanyQueryHandler";
import { RegisterCompanyCommandHandler } from "Invoicing/Company/Application/RegisterCompany/RegisterCompanyCommandHandler";
import { PgCompanyMapper } from "Invoicing/Company/Infrastructure/Persistance/Mapper/PgCompanyMapper";
import { PgCompanyRepository } from "Invoicing/Company/Infrastructure/Persistance/Repository/PgCompanyRepository";

const Handlers = [
  FindCompanyQueryHandler,
  RegisterCompanyCommandHandler
];

const Mappers = [ PgCompanyMapper ];

const Repositories = [
  {
    provide: 'ICompanyRepository',
    useClass: PgCompanyRepository
  }
]

@Module({
  imports: [ CqrsModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Mappers,
    ...Repositories
  ],
  exports: [],
})
export class CompanyModule {}
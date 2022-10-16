import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { FindCompanyQueryHandler } from "Backoffice/Company/Application/FindCompany/FindCompanyQueryHandler";
import { RegisterCompanyCommandHandler } from "Backoffice/Company/Application/RegisterCompany/RegisterCompanyCommandHandler";
import { RegisterCompanyController } from "Backoffice/Company/Infrastructure/Controller/RegisterCompany/RegisterCompanyController";
import { PgCompanyMapper } from "Backoffice/Company/Infrastructure/Persistance/Mapper/PgCompanyMapper";
import { PgCompanyRepository } from "Backoffice/Company/Infrastructure/Persistance/Repository/PgCompanyRepository";
import { UserMiddleware } from "Shared/Infrastructure/Middlewares/UserMiddleware";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  FindCompanyQueryHandler,
  RegisterCompanyCommandHandler
];

const Repository = [
  {
    provide: 'ICompanyRepository',
    useClass: PgCompanyRepository
  },
];

const Controllers = [ RegisterCompanyController ];

const Mappers = [
  PgCompanyMapper
];


@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ ...Controllers ],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers,
  ],
  exports: [],
})
export class CompanyModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(...Controllers)
  }
}
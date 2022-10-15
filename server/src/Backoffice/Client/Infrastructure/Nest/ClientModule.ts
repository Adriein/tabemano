import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientRegisteredDomainEventHandler } from "Backoffice/Client/Application/CreateClient/ClientRegisteredDomainEventHandler";
import { FindTenantClientsQueryHandler } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQueryHandler";
import { GetClientProfileQueryHandler } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQueryHandler";
import { FindTenantClientsController } from "Backoffice/Client/Infrastructure/Controller/FindTenantClients/FindTenantClientsController";
import { GetClientProfileController } from "Backoffice/Client/Infrastructure/Controller/GetClientProfile/GetClientProfileController";
import { PgClientMapper } from "Backoffice/Client/Infrastructure/Persistance/Mapper/PgClientMapper";
import { PgClientRepository } from "Backoffice/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { UserFilterFactory } from "Backoffice/Tenant/Infrastructure/UserFilterFactory";
import { UserMiddleware } from "Shared/Infrastructure/Middlewares/UserMiddleware";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  GetClientProfileQueryHandler,
  FindTenantClientsQueryHandler,
  ClientRegisteredDomainEventHandler
];

const Factory = [
  {
    provide: 'IFilterFactory',
    useClass: UserFilterFactory
  },
]

const Repository = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository
  },
  {
    provide: 'ISubscriptionRepository',
    useClass: PgSubscriptionRepository
  }
];

const Mappers = [
  PgSubscriptionMapper,
  PgClientMapper
];

const Controllers = [ GetClientProfileController, FindTenantClientsController ]

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ ...Controllers ],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers,
    ...Factory
  ],
  exports: [],
})
export class ClientModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(...Controllers)
  }
}
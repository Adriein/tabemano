import { MiddlewareConsumer, Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { ConfigureTenantCommandHandler } from "Backoffice/Tenant/Application/ConfigureTenant/ConfigureTenantCommandHandler";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { RegisterClientCommandHandler } from "Backoffice/Tenant/Application/RegisterClient/RegisterClientCommandHandler";
import { ConfigureTenantController } from "Backoffice/Tenant/Infrastructure/Controller/ConfigureTenant/ConfigureTenantController";
import { RegisterClientController } from "Backoffice/Tenant/Infrastructure/Controller/RegisterClient/RegisterClientController";
import { PgTenantMapper } from "Backoffice/Tenant/Infrastructure/Persistance/Mapper/PgTenantMapper";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Persistance/Repository/PgTenantRepository";
import { UserMiddleware } from "Shared/Infrastructure/Middlewares/UserMiddleware";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  CreateTenantDomainEventHandler,
  RegisterClientCommandHandler,
  ConfigureTenantCommandHandler
];

const Repository = [
  {
    provide: 'ITenantRepository',
    useClass: PgTenantRepository
  },
  {
    provide: 'ISubscriptionRepository',
    useClass: PgSubscriptionRepository
  }
];

const Mappers = [
  PgTenantMapper,
  PgSubscriptionMapper
];

const Controllers = [ ConfigureTenantController, RegisterClientController ];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ ...Controllers ],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers
  ],
  exports: [],
})
export class TenantModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserMiddleware).forRoutes(...Controllers);
  }
}
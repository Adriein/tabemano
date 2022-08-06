import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { RegisterClientCommandHandler } from "Backoffice/Tenant/Application/RegisterClient/RegisterClientCommandHandler";
import { RegisterClientController } from "Backoffice/Tenant/Infrastructure/Controller/RegisterClient/RegisterClientController";
import { PgTenantMapper } from "Backoffice/Tenant/Infrastructure/Persistance/Mapper/PgTenantMapper";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Persistance/Repository/PgTenantRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  CreateTenantDomainEventHandler,
  RegisterClientCommandHandler
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

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ RegisterClientController ],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers
  ],
  exports: [],
})
export class TenantModule {}
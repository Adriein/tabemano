import { Module } from "@nestjs/common";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Persistance/Repository/PgTenantRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ CreateTenantDomainEventHandler ];

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

@Module({
  imports: [ TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Repository
  ],
  exports: [],
})
export class TenantModule {}
import { Module } from "@nestjs/common";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Persistance/Repository/PgTenantRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ CreateTenantDomainEventHandler ];

const Repository = [
  {
    provide: 'ITenantRepository',
    useClass: PgTenantRepository
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
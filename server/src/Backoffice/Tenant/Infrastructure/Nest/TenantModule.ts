import { Module } from "@nestjs/common";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { PgTenantMapper } from "Backoffice/Tenant/Infrastructure/Persistance/Mapper/PgTenantMapper";
import { PgTenantRepository } from "Backoffice/Tenant/Infrastructure/Persistance/Repository/PgTenantRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ CreateTenantDomainEventHandler ];

const Repository = [
  {
    provide: 'ITenantRepository',
    useClass: PgTenantRepository
  }
];

const Mappers = [
  PgTenantMapper,
];

@Module({
  imports: [ TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers
  ],
  exports: [],
})
export class TenantModule {}
import { Module } from "@nestjs/common";
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
  }
];

const Mappers = [
  PgTenantMapper,
];

@Module({
  imports: [ TypeOrmModule ],
  controllers: [ RegisterClientController ],
  providers: [
    ...Handlers,
    ...Repository,
    ...Mappers
  ],
  exports: [],
})
export class TenantModule {}
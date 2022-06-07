import { Module } from "@nestjs/common";
import { CreateTenantDomainEventHandler } from "Backoffice/Tenant/Application/CreateTenant/CreateTenantDomainEventHandler";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ CreateTenantDomainEventHandler ];

@Module({
  imports: [ TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
  ],
  exports: [],
})
export class TenantModule {}
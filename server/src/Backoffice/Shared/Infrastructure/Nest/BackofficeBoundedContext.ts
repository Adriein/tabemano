import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientModule } from "Backoffice/Client/Infrastructure/Nest/ClientModule";
import { RoleModule } from "Backoffice/Role/Infrastructure/RoleModule";
import { PgConfigMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgConfigMapper";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/Nest/TenantModule";

const Mappers = [ PgConfigMapper ];

@Module({
  imports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
  controllers: [],
  providers: [ ...Mappers ],
  exports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
})
export class BackofficeBoundedContext {}
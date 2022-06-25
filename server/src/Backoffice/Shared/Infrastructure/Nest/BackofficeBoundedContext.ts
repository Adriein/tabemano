import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientModule } from "Backoffice/Client/Infrastructure/Nest/ClientModule";
import { RoleModule } from "Backoffice/Role/Infrastructure/RoleModule";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/Nest/TenantModule";

@Module({
  imports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
  controllers: [],
  providers: [],
  exports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
})
export class BackofficeBoundedContext {}
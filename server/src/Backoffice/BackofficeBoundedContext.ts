import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RoleModule } from "Backoffice/Role/Infrastructure/RoleModule";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/TenantModule";

@Module({
  imports: [ CqrsModule, RoleModule, TenantModule ],
  controllers: [],
  providers: [],
  exports: [ CqrsModule, RoleModule ],
})
export class BackofficeBoundedContext {}
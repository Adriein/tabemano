import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { RoleModule } from "Backoffice/Role/Infrastructure/RoleModule";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/TenantModule";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";


@Module({
  imports: [ CqrsModule, TypeOrmModule, RoleModule, TenantModule ],
  controllers: [],
  providers: [],
  exports: [ CqrsModule, TypeOrmModule, RoleModule ],
})
export class BackofficeBoundedContext {}
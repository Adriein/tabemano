import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientModule } from "Backoffice/Client/Infrastructure/Nest/ClientModule";
import { NotificationModule } from "Backoffice/Notification/Infrastructure/Nest/NotificationModule";
import { PricingModule } from "Backoffice/Pricing/Infrastructure/Nest/PricingModule";
import { RoleModule } from "Backoffice/Role/Infrastructure/Nest/RoleModule";
import { PgConfigMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgConfigMapper";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/Nest/TenantModule";

const Mappers = [ PgConfigMapper, PgSubscriptionMapper ];

@Module({
  imports: [ CqrsModule, RoleModule, TenantModule, ClientModule, PricingModule, NotificationModule ],
  controllers: [],
  providers: [
    ...Mappers,
  ],
  exports: [ CqrsModule, RoleModule, TenantModule, ClientModule, PricingModule, NotificationModule ],
})
export class BackofficeBoundedContext {}
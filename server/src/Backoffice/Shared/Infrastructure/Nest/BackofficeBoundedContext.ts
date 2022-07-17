import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientModule } from "Backoffice/Client/Infrastructure/Nest/ClientModule";
import { RoleModule } from "Backoffice/Role/Infrastructure/RoleModule";
import { PgConfigMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgConfigMapper";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { TenantModule } from "Backoffice/Tenant/Infrastructure/Nest/TenantModule";

const Mappers = [ PgConfigMapper, PgSubscriptionMapper ];

const Repositories = [
  {
    provide: 'ISubscriptionRepository',
    useClass: PgSubscriptionRepository
  }
];

@Module({
  imports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
  controllers: [],
  providers: [
    ...Mappers,
    ...Repositories
  ],
  exports: [ CqrsModule, RoleModule, TenantModule, ClientModule ],
})
export class BackofficeBoundedContext {}
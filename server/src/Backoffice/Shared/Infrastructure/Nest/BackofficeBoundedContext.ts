import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientModule } from 'Backoffice/Client/Infrastructure/Nest/ClientModule';
import { CompanyModule } from 'Backoffice/Company/Infrastructure/Nest/CompanyModule';
import { ProductModule } from 'Backoffice/Product/Infrastructure/Nest/ProductModule';
import { PgProductMapper } from 'Backoffice/Product/Infrastructure/Persistance/Mapper/PgProductMapper';
import { NotificationModule } from 'Backoffice/Notification/Infrastructure/Nest/NotificationModule';
import { PricingModule } from 'Backoffice/Pricing/Infrastructure/Nest/PricingModule';
import { RoleModule } from 'Backoffice/Role/Infrastructure/Nest/RoleModule';
import { PgConfigMapper } from 'Backoffice/Shared/Infrastructure/Persistance/Mapper/PgConfigMapper';
import { PgSubscriptionMapper } from 'Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper';
import { TenantModule } from 'Backoffice/Tenant/Infrastructure/Nest/TenantModule';

const Mappers = [ PgConfigMapper, PgSubscriptionMapper, PgProductMapper ];

@Module({
  imports: [
    RoleModule,
    TenantModule,
    ClientModule,
    PricingModule,
    NotificationModule,
    CompanyModule,
    ProductModule,
  ],
  controllers: [],
  providers: [ ...Mappers ],
  exports: [],
})
export class BackofficeBoundedContext {}

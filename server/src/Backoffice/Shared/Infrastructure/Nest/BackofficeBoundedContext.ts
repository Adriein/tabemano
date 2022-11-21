import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientModule } from 'Backoffice/Client/Infrastructure/Nest/ClientModule';
import { CompanyModule } from 'Backoffice/Company/Infrastructure/Nest/CompanyModule';
import { ModuleModule } from 'Backoffice/Module/Infrastructure/Nest/ModuleModule';
import { PgModuleMapper } from 'Backoffice/Module/Infrastructure/Persistance/Mapper/PgModuleMapper';
import { NotificationModule } from 'Backoffice/Notification/Infrastructure/Nest/NotificationModule';
import { PricingModule } from 'Backoffice/Pricing/Infrastructure/Nest/PricingModule';
import { RoleModule } from 'Backoffice/Role/Infrastructure/Nest/RoleModule';
import { PgConfigMapper } from 'Backoffice/Shared/Infrastructure/Persistance/Mapper/PgConfigMapper';
import { PgSubscriptionMapper } from 'Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper';
import { TenantModule } from 'Backoffice/Tenant/Infrastructure/Nest/TenantModule';

const Mappers = [PgConfigMapper, PgSubscriptionMapper, PgModuleMapper];

@Module({
  imports: [
    CqrsModule,
    RoleModule,
    TenantModule,
    ClientModule,
    PricingModule,
    NotificationModule,
    CompanyModule,
    ModuleModule,
  ],
  controllers: [],
  providers: [...Mappers],
  exports: [
    CqrsModule,
    RoleModule,
    TenantModule,
    ClientModule,
    PricingModule,
    NotificationModule,
    CompanyModule,
    ModuleModule,
  ],
})
export class BackofficeBoundedContext {}

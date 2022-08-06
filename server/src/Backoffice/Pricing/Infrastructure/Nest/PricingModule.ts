import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CreateDefaultTenantPricesDomainEventHandler } from "Backoffice/Pricing/Application/CreateDefaultTenantPrices/CreateDefaultTenantPricesDomainEventHandler";
import { FindPricingQueryHandler } from "Backoffice/Pricing/Application/FindPricing/FindPricingQueryHandler";
import { FindPricingController } from "Backoffice/Pricing/Infrastructure/Controller/FindPricing/FindPricingController";
import { PgPricingMapper } from "Backoffice/Pricing/Infrastructure/Persistance/Mapper/PgPricingMapper";
import { PgPricingRepository } from "Backoffice/Pricing/Infrastructure/Persistance/Repository/PgPricingRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  CreateDefaultTenantPricesDomainEventHandler,
  FindPricingQueryHandler
];

const Repositories = [
  {
    provide: 'IPricingRepository',
    useClass: PgPricingRepository,
  },
];

const Mappers = [ PgPricingMapper ];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ FindPricingController ],
  providers: [
    ...Handlers,
    ...Repositories,
    ...Mappers
  ],
  exports: [],
})
export class PricingModule {}
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CheckAboutToExpireSubscriptionsCommandHandler } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommandHandler";
import { CheckExpiredSubscriptionsCommandHandler } from "Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommandHandler";
import { CheckAboutToExpireSubscriptionsController } from "Cron/Client/Infrastructure/Controller/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsController";
import { CheckExpiredSubscriptionsController } from "Cron/Client/Infrastructure/Controller/CheckExpiredSubscriptions/CheckExpiredSubscriptionsController";
import { PgClientMapper } from "Cron/Client/Infrastructure/Persistance/Mapper/PgClientMapper";
import { PgClientRepository } from "Cron/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { PgBackGroundJobMapper } from "Cron/Shared/Infrastructure/Persistance/Mapper/PgBackGroundJobMapper";
import { PgBackGroundJobRepository } from "Cron/Shared/Infrastructure/Persistance/Repository/PgBackGroundJobRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Repositories = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository,
  },
  {
    provide: 'IBackGroundJobRepository',
    useClass: PgBackGroundJobRepository,
  }
];

const Mappers = [
  PgClientMapper,
  PgBackGroundJobMapper
];

const Handlers = [
  CheckAboutToExpireSubscriptionsCommandHandler,
  CheckExpiredSubscriptionsCommandHandler
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [
    CheckExpiredSubscriptionsController,
    CheckAboutToExpireSubscriptionsController
  ],
  providers: [
    ...Handlers,
    ...Repositories,
    ...Mappers
  ],
  exports: [],
})
export class CronClientModule {}
import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CheckAboutToExpireSubscriptionsCommandHandler } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommandHandler";
import { CheckExpiredSubscriptionsCommandHandler } from "Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommandHandler";
import { CheckExpiredSubscriptionsController } from "Cron/Client/Infrastructure/Controller/CheckExpiredSubscriptions/CheckExpiredSubscriptionsController";
import { PgClientMapper } from "Cron/Client/Infrastructure/Persistance/Mapper/PgClientMapper";
import { PgClientRepository } from "Cron/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Repositories = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository,
  }
];

const Mappers = [
  PgClientMapper
];

const Handlers = [
  CheckAboutToExpireSubscriptionsCommandHandler,
  CheckExpiredSubscriptionsCommandHandler
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [
    CheckExpiredSubscriptionsController
  ],
  providers: [
    ...Handlers,
    ...Repositories,
    ...Mappers
  ],
  exports: [],
})
export class CronClientModule {}
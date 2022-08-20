import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CronClientModule } from "Cron/Client/Infrastructure/Nest/CronClientModule";
import { PgBackGroundJobMapper } from "Cron/Shared/Infrastructure/Persistance/Mapper/PgBackGroundJobMapper";
import { PgBackGroundJobRepository } from "Cron/Shared/Infrastructure/Persistance/Repository/PgBackGroundJobRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Repositories = [
  {
    provide: 'IBackGroundJobRepository',
    useClass: PgBackGroundJobRepository,
  }
];

const Mappers = [
  PgBackGroundJobMapper
];

@Module({
  imports: [ CqrsModule, TypeOrmModule, CronClientModule ],
  controllers: [],
  providers: [
    ...Repositories,
    ...Mappers
  ],
  exports: [ CronClientModule ],
})
export class CronBoundedContext {}
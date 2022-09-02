import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { CronClientModule } from "Cron/Client/Infrastructure/Nest/CronClientModule";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";


@Module({
  imports: [ CqrsModule, TypeOrmModule, CronClientModule ],
  controllers: [],
  providers: [],
  exports: [ CronClientModule ],
})
export class CronBoundedContext {}
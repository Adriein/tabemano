import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CronClientModule } from 'Cron/Client/Infrastructure/Nest/CronClientModule';
import { CronCreditModule } from 'Cron/Credit/Infrastructure/Nest/CronCreditModule';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';

@Module({
  imports: [ CqrsModule, TypeOrmModule, CronClientModule, CronCreditModule ],
  controllers: [],
  providers: [],
  exports: [ CronClientModule, CronCreditModule ],
})
export class CronBoundedContext {}

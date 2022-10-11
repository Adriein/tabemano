import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CronClientModule } from 'Cron/Client/Infrastructure/Nest/CronClientModule';
import { UpdateRemainingCreditCommandHandler } from 'Cron/Credit/Application/UpdateRemainingCredit/UpdateRemainingCreditCommandHandler';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';

// const Repositories = [
//   {
//     provide: 'IThirdPartyServiceRepository',
//     useClass: PgThirdPartyServiceRepository,
//   },
// ];

const Handlers = [UpdateRemainingCreditCommandHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule, CronClientModule],
  controllers: [],
  providers: [...Handlers],
  exports: [CronClientModule],
})
export class CronBoundedContext {}

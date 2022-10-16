import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateRemainingCreditCommandHandler } from 'Cron/Credit/Application/UpdateRemainingCredit/UpdateRemainingCreditCommandHandler';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { SendGridRemainingCreditService } from '../Factory/SendGridRemainingCreditService';
import { PgThirdPartyServiceMapper } from '../Persistance/Mapper/PgThirdPartyServiceMapper';
import { PgThirdPartyServiceRepository } from '../Persistance/Repository/PgThirdPartyServiceRepository';

const Services = [SendGridRemainingCreditService];

const Repositories = [
  {
    provide: 'IThirdPartyServiceRepository',
    useClass: PgThirdPartyServiceRepository,
  },
];

const Mappers = [PgThirdPartyServiceMapper];

const Handlers = [UpdateRemainingCreditCommandHandler];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [],
  providers: [...Repositories, ...Handlers, ...Mappers, ...Services],
  exports: [],
})
export class CronCreditModule {}

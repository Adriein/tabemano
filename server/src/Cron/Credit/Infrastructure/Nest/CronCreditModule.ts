import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { UpdateRemainingCreditCommandHandler } from 'Cron/Credit/Application/UpdateRemainingCredit/UpdateRemainingCreditCommandHandler';
import { ThirdPartyServiceAbstractFactory } from 'Cron/Credit/Infrastructure/Factory/ThirdPartyServiceAbstractFactory';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { UpdateRemainingCreditController } from '../Controller/UpdateRemainingCreditController';
import { SendGridRemainingCreditService } from '../Factory/SendGridRemainingCreditService';
import { PgThirdPartyServiceMapper } from '../Persistance/Mapper/PgThirdPartyServiceMapper';
import { PgThirdPartyServiceRepository } from '../Persistance/Repository/PgThirdPartyServiceRepository';

const Services = [SendGridRemainingCreditService];

const Factory = [
  {
    provide: 'IThirdPartyServiceAbstractFactory',
    useClass: ThirdPartyServiceAbstractFactory,
  },
];

const Repositories = [
  {
    provide: 'IThirdPartyServiceRepository',
    useClass: PgThirdPartyServiceRepository,
  },
];

const Mappers = [PgThirdPartyServiceMapper];

const Handlers = [UpdateRemainingCreditCommandHandler];

const Controllers = [UpdateRemainingCreditController];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [...Controllers],
  providers: [...Repositories, ...Handlers, ...Mappers, ...Services, ...Factory],
  exports: [],
})
export class CronCreditModule {}

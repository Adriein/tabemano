import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { SendAboutToExpireSubscriptionEmailHandler } from 'Backoffice/Notification/Application/SendAboutToExpireSubscriptionEmail/SendAboutToExpireSubscriptionEmailHandler';
import { SendRemainingCreditIsCloseToRunningOutEmailHandler } from 'Backoffice/Notification/Application/SendRemainingCreditIsCloseToRunningOutEmail/SendRemainingCreditIsCloseToRunningOutEmailHandler';
import { VerifyTenantEmailDomainEventHandler } from 'Backoffice/Notification/Application/VerifyTenantEmail/VerifyTenantEmailDomainEventHandler';
import { SendGridSmtpServiceAbstractFactory } from 'Backoffice/Notification/Infrastructure/Factory/SendGridSmtpServiceAbstractFactory';
import { TenantMapper } from 'Backoffice/Notification/Infrastructure/Persistance/Mapper/TenantMapper';
import { PgClientRepository } from 'Backoffice/Notification/Infrastructure/Persistance/Repository/PgClientRepository';
import { PgTenantRepository } from 'Backoffice/Notification/Infrastructure/Persistance/Repository/PgTenantRepository';
import { SendGridSmtpService } from 'Backoffice/Notification/Infrastructure/Service/SendGridSmtpService';
import { SendGridVerifyTenantEmailService } from 'Backoffice/Notification/Infrastructure/Service/SendGridVerifyTenantEmailService';
import { TypeOrmModule } from 'Shared/Infrastructure/Persistance/TypeOrmModule';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';

const Handlers = [
  SendAboutToExpireSubscriptionEmailHandler,
  VerifyTenantEmailDomainEventHandler,
  SendRemainingCreditIsCloseToRunningOutEmailHandler,
];

const Factories = [
  {
    provide: 'IThirdPartySmtpServiceAbstractFactory',
    useClass: SendGridSmtpServiceAbstractFactory,
  },
];

const Repository = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository,
  },
  {
    provide: 'ITenantRepository',
    useClass: PgTenantRepository,
  },
];

const Service = [
  {
    provide: 'ISmtpService',
    useClass: SendGridSmtpService,
  },
  {
    provide: 'IVerifyTenantEmailService',
    useClass: SendGridVerifyTenantEmailService,
  },
];

const Mapper = [TenantMapper];

@Module({
  imports: [CqrsModule, TypeOrmModule],
  controllers: [],
  providers: [...Handlers, ...Service, ...Repository, ...Mapper, ...Factories, SendGridClient],
  exports: [],
})
export class NotificationModule {}

import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SendAboutToExpireSubscriptionEmailHandler } from "Backoffice/Notification/Application/SendAboutToExpireSubscriptionEmail/SendAboutToExpireSubscriptionEmailHandler";
import { TenantMapper } from "Backoffice/Notification/Infrastructure/Persistance/Mapper/TenantMapper";
import { PgClientRepository } from "Backoffice/Notification/Infrastructure/Persistance/Repository/PgClientRepository";
import { SendGridSmtpService } from "Backoffice/Notification/Infrastructure/Service/SendGridSmtpService";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  SendAboutToExpireSubscriptionEmailHandler
];

const Repository = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository
  }
];

const Service = [
  {
    provide: 'ISmtpService',
    useClass: SendGridSmtpService
  }
];

const Mapper = [
  TenantMapper
];

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Service,
    ...Repository,
    ...Mapper
  ],
  exports: [],
})
export class NotificationModule {}
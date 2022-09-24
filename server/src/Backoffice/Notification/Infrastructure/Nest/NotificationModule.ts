import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { SendAboutToExpireSubscriptionEmailHandler } from "Backoffice/Notification/Application/SendAboutToExpireSubscriptionEmail/SendAboutToExpireSubscriptionEmailHandler";
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

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [],
  providers: [
    ...Handlers,
    ...Service,
  ],
  exports: [],
})
export class NotificationModule {}
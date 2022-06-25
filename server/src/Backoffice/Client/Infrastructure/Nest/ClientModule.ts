import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { GetClientProfileQueryHandler } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQueryHandler";
import { GetClientProfileController } from "Backoffice/Client/Infrastructure/Controller/GetClientProfile/GetClientProfileController";
import { PgClientRepository } from "Backoffice/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Persistance/Repository/PgSubscriptionRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [ GetClientProfileQueryHandler ];

const Repository = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository
  },
  {
    provide: 'ISubscriptionRepository',
    useClass: PgSubscriptionRepository
  }
];

const Controllers = [ GetClientProfileController ]

@Module({
  imports: [ CqrsModule, TypeOrmModule ],
  controllers: [ ...Controllers ],
  providers: [
    ...Handlers,
    ...Repository
  ],
  exports: [],
})
export class ClientModule {}
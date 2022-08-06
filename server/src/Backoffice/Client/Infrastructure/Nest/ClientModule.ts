import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { ClientRegisteredDomainEventHandler } from "Backoffice/Client/Application/CreateClient/ClientRegisteredDomainEventHandler";
import { FindTenantClientsQueryHandler } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQueryHandler";
import { GetClientProfileQueryHandler } from "Backoffice/Client/Application/GetClientProfile/GetClientProfileQueryHandler";
import { GetClientProfileController } from "Backoffice/Client/Infrastructure/Controller/GetClientProfile/GetClientProfileController";
import { PgClientRepository } from "Backoffice/Client/Infrastructure/Persistance/Repository/PgClientRepository";
import { TypeOrmModule } from "Shared/Infrastructure/Persistance/TypeOrmModule";

const Handlers = [
  GetClientProfileQueryHandler,
  FindTenantClientsQueryHandler,
  ClientRegisteredDomainEventHandler
];

const Repository = [
  {
    provide: 'IClientRepository',
    useClass: PgClientRepository
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
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantCommandHandler } from "Authorization/Application/RegisterTenant/RegisterTenantCommandHandler";
import { PgAuthRepository } from "Authorization/Infrastructure/Data/Repositories/PgAuthRepository";
import { CheckExpiredSubscriptionsCommand } from "Backoffice/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";
import { CheckExpiredSubscriptionsCommandHandler } from "Backoffice/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommandHandler";
import { PgClientRepository } from "Backoffice/Client/Infrastructure/Data/Repository/PgClientRepository";
import { PgBackgroundJobRepository } from "Backoffice/Shared/Infrastructure/Data/Repositories/PgBackgroundJobRepository";
import { PgSubscriptionRepository } from "Backoffice/Shared/Infrastructure/Data/Repositories/PgSubscriptionRepository";
import { CryptoService } from "Shared/Domain/Services/CryptoService";
import { QueryBus } from "Shared/Infrastructure/Bus/QueryBus";
import { ICommandHandler } from "../../Domain/Interfaces/ICommandHandler";
import { ConstructorFunc } from "../../Domain/types";

export default class CommandHandlerFactory {
  private handlers: Map<string, ICommandHandler> = new Map();

  private authRepository = new PgAuthRepository();
  private cryptoService = new CryptoService();
  private clientRepository = new PgClientRepository();
  private backgroundJobRepository = new PgBackgroundJobRepository();
  private subscriptionRepository = new PgSubscriptionRepository();

  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): ICommandHandler {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No handler with this name');
    }

    return handler;
  }

  private register() {
    //Authentication
    this.handlers.set(
      RegisterTenantCommand.name,
      new RegisterTenantCommandHandler(this.authRepository, QueryBus.instance(), this.cryptoService)
    );

    this.handlers.set(
      CheckExpiredSubscriptionsCommand.name,
      new CheckExpiredSubscriptionsCommandHandler(
        this.clientRepository,
        this.subscriptionRepository,
        this.backgroundJobRepository
      )
    );
  }

  public getContainer(): Map<string, ICommandHandler> {
    return this.handlers;
  }
}
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantCommandHandler } from "Authorization/Application/RegisterTenant/RegisterTenantCommandHandler";
import { PgAuthRepository } from "Authorization/Infrastructure/Data/Repositories/PgAuthRepository";
import { QueryBus } from "Shared/Infrastructure/Bus/QueryBus";
import { ICommandHandler } from "../../Domain/Interfaces/ICommandHandler";
import { ConstructorFunc } from "../../Domain/types";

export default class CommandHandlerFactory {
  private handlers: Map<string, ICommandHandler> = new Map();

  private authRepository = new PgAuthRepository();

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
      new RegisterTenantCommandHandler(this.authRepository, QueryBus.instance())
    );
  }

  public getContainer(): Map<string, ICommandHandler> {
    return this.handlers;
  }
}
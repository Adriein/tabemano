import { ICommandHandler } from "../../Domain/Interfaces/ICommandHandler";
import { ConstructorFunc } from "../../Domain/types";
import { QueryBus } from "../Bus/QueryBus";


export default class CommandHandlerFactory {
  private handlers: Map<string, ICommandHandler> = new Map();



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

  }

  public getContainer(): Map<string, ICommandHandler> {
    return this.handlers;
  }
}
import { IHandler } from "../../Domain/Interfaces/ICommandHandler";
import { ConstructorFunc } from "../../Domain/types";
import { QueryBus } from "../Bus/QueryBus";


export default class CommandHandlerFactory {
  private handlers: Map<string, IHandler<any>> = new Map();



  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No handler with this name');
    }

    return handler;
  }

  private register() {

  }

  public getContainer(): Map<string, IHandler<any>> {
    return this.handlers;
  }
}
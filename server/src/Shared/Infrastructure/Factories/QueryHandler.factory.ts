import { ConstructorFunc } from '../../Domain/types';
import { QueryBus } from '../Bus/QueryBus';
import { CryptoService } from "../../Domain/Services/CryptoService";
import { IQueryHandler } from "../../Domain/Interfaces/IQueryHandler";


export default class QueryHandlerFactory {
  private handlers: Map<string, IQueryHandler<any>> = new Map();


  private cryptoService: CryptoService = new CryptoService();


  constructor() {
    this.register();
  }

  public create<T, R>(_handler: ConstructorFunc<T>): IQueryHandler<R> {
    const handler = this.handlers.get(_handler.name);

    if (!handler) {
      throw new Error('No handler with this name');
    }

    return handler;
  }

  private register() {

  }

  public getContainer(): Map<string, IQueryHandler<any>> {
    return this.handlers;
  }
}

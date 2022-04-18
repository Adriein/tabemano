import { IQueryBus } from '../../Domain/Bus/IQueryBus';
import { QueryClass } from '../../Domain/types';
import { IQuery } from "../../Domain/Interfaces/IQuery";
import { IQueryHandler } from "../../Domain/Interfaces/IQueryHandler";

export class QueryBus implements IQueryBus {
  private static _instance: QueryBus;
  private static handlers: Map<string, IQueryHandler<any>> = new Map();

  private constructor() {
  }

  public static instance(): QueryBus {
    if (!QueryBus._instance) {
      QueryBus._instance = new QueryBus();
    }

    return QueryBus._instance as QueryBus;
  }

  public static bind = (command: QueryClass, handler: IQueryHandler<any>): void => {
    QueryBus.handlers.set(command.name, handler);
  };

  public async ask<T>(query: IQuery): Promise<T> {
    return await this.resolve(query).handle(query);
  }

  private resolve(query: IQuery): IQueryHandler<any> {
    const handler = QueryBus.handlers.get(query.constructor.name);

    if (!handler) {
      throw new Error(`No query handler found for ${query.constructor.name}`);
    }

    return handler;
  }
}

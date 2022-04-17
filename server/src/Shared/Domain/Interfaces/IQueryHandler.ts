import { IQuery } from "./IQuery";

export interface IQueryHandler<T> {
  handle(command: IQuery): Promise<T>;
}

import { Filter } from "Shared/Domain/Entities/Filter";
import { IQuery } from "Shared/Domain/Interfaces/IQuery";

export interface IFilterFactory<T extends Filter> {
  create(query: IQuery): T;
}
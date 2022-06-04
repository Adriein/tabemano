import { IQuery } from "@nestjs/cqrs";
import { Filter } from "Shared/Domain/Entities/Filter";

export interface IFilterFactory<T extends Filter> {
  create(query: IQuery): T;
}
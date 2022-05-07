import { FindAppFiltersQuery } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQuery";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";

export class FindAppFiltersQueryHandler implements IQueryHandler<any> {
  public async handle(query: FindAppFiltersQuery): Promise<any> {
    return Promise.resolve(undefined);
  }

}
import { FindAppFiltersQuery } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersQuery";
import { FindFiltersResponse } from "Backoffice/AppFilter/Application/FindAppFilters/FindAppFiltersResponse";
import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { FilterableField } from "Backoffice/AppFilter/Domain/Entity/FilterableField";
import { AppFilterFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilterFilter";
import { IAppFilterRepository } from "Backoffice/AppFilter/Domain/Repository/IAppFilterRepository";
import { QueryHandler } from "Shared/Domain/Decorators/QueryHandler.decorator";
import { IQueryHandler } from "Shared/Domain/Interfaces/IQueryHandler";
import { ID } from "Shared/Domain/Vo/Id.vo";

@QueryHandler(FindAppFiltersQuery)
export class FindAppFiltersQueryHandler implements IQueryHandler<FindFiltersResponse[]> {
  constructor(private readonly repository: IAppFilterRepository) {}

  public async handle(query: FindAppFiltersQuery): Promise<FindFiltersResponse[]> {
    const tenantId = new ID(query.tenantId);

    const appFilters = await this.getAppFiltersByTenant(tenantId, query.entities);

    return this.buildResponse(appFilters);
  }

  private async getAppFiltersByTenant(tenantId: ID, entities: string[]): Promise<AppFilter[]> {
    const filter = new AppFilterFilter();
    filter.withEntities(entities).withTenantId(tenantId);

    const result = await this.repository.find(filter);

    if (result.isError()) {
      throw result.value;
    }

    return result.value;
  }

  private buildResponse(filters: AppFilter[]): FindFiltersResponse[] {
    return filters.map((appFilter: AppFilter) => {
      const fields = this.buildResponseFields(appFilter);

      return new FindFiltersResponse(
        appFilter.entity(),
        fields
      );
    });
  }

  private buildResponseFields(appFilter: AppFilter): Record<string, string[]> {
    return appFilter.field().reduce((response: Record<string, string[]>, field: FilterableField) => {
      return {
        ...response,
        [field.name()]: field.values()
      }
    }, {})
  }

}
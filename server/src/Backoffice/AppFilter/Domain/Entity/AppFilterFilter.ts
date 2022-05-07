import { Filter } from "Shared/Domain/Entities/Filter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppFilterFilter implements Filter {
  public static ENTITIES_FILTER = 'entities';
  public static TENANT_ID_FILTER = 'tenantId';

  private data: Map<string, any> = new Map();

  public withEntities(entities: string[]): this {
    this.data.set(AppFilterFilter.ENTITIES_FILTER, entities);
    return this;
  };

  public withTenantId(tenantId: ID): this {
    this.data.set(AppFilterFilter.TENANT_ID_FILTER, tenantId);
    return this;
  };

  public paginate(): Pagination {
    const pagination = new Pagination();
    this.data.set(Pagination.PAGINATION_FILTER, pagination);
    return pagination;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
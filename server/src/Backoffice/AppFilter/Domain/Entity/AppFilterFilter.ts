import { Filter } from "Shared/Domain/Entities/Filter";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppFilterFilter extends Filter {
  public static ENTITIES_FILTER = 'entities';
  public static TENANT_ID_FILTER = 'tenantId';

  protected data: Map<string, any> = new Map();

  public withEntities(entities: string[]): this {
    this.data.set(AppFilterFilter.ENTITIES_FILTER, entities);
    return this;
  };

  public withTenantId(tenantId: ID): this {
    this.data.set(AppFilterFilter.TENANT_ID_FILTER, tenantId);
    return this;
  };

  public apply(): Map<string, any> {
    return this.data;
  }
}
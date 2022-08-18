import { Filter } from 'Shared/Domain/Entities/Filter';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class PermissionFilter extends Filter {
  public static TENANT_ID_FILTER = 'tenant_id';
  public static MODULE_ID_FILTER = 'module_id';

  public static create(): PermissionFilter {
    return new PermissionFilter();
  }

  protected data: Map<string, any> = new Map();

  public withTenantId(id: ID): this {
    this.data.set(PermissionFilter.TENANT_ID_FILTER, id);
    return this;
  }

  public withModuleId(id: ID): this {
    this.data.set(PermissionFilter.MODULE_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}

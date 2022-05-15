import { Filter } from "Shared/Domain/Entities/Filter";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class PricingFilter extends Filter {
  public static NAME_FILTER = 'name';
  public static TENANT_ID_FILTER = 'tenantId';

  public static builder(): PricingFilter {
    return new PricingFilter();
  }

  protected data: Map<string, any> = new Map();

  public withName(name: string): this {
    this.data.set(PricingFilter.NAME_FILTER, name);
    return this;
  };

  public withTenantId(id: ID): this {
    this.data.set(PricingFilter.TENANT_ID_FILTER, id);
    return this;
  };

  public apply(): Map<string, any> {
    return this.data;
  }
}
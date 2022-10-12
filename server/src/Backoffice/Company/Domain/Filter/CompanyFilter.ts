import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Filter } from "Shared/Domain/Entities/Filter";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class CompanyFilter extends Filter {
  public static FISCAL_ID_FILTER = 'fiscalId';
  public static TENANT_ID_FILTER = 'tenantId';

  public static create(): CompanyFilter {
    return new CompanyFilter();
  }

  protected data: Map<string, any> = new Map();

  public withFiscalId(fiscalId: FiscalId): this {
    this.data.set(CompanyFilter.FISCAL_ID_FILTER, fiscalId);
    return this;
  }

  public withTenantId(tenantId: ID): this {
    this.data.set(CompanyFilter.TENANT_ID_FILTER, tenantId);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
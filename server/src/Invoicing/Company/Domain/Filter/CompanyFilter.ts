import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { Filter } from "Shared/Domain/Entities/Filter";

export class CompanyFilter extends Filter {
  public static FISCAL_ID_FILTER = 'fiscalId';

  public static create(): CompanyFilter {
    return new CompanyFilter();
  }

  protected data: Map<string, any> = new Map();

  public withFiscalId(fiscalId: FiscalId): this {
    this.data.set(CompanyFilter.FISCAL_ID_FILTER, fiscalId);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
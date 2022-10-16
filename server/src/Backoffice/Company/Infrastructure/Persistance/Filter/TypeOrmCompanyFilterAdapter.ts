import { CompanyFilter } from "Backoffice/Company/Domain/Filter/CompanyFilter";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { FindManyOptions } from "typeorm";

export class TypeOrmCompanyFilterAdapter extends TypeOrmAdapter<FindManyOptions<CompanyModel>> {
  constructor(private readonly filter: CompanyFilter) {
    super();
  }

  public apply(): FindManyOptions<CompanyModel> {
    const filters = this.filter.apply();

    if (filters.has(CompanyFilter.FISCAL_ID_FILTER)) {
      const fiscalId = filters.get(CompanyFilter.FISCAL_ID_FILTER) as FiscalId;

      this.add({ where: { fiscalId } });
    }

    if (filters.has(CompanyFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(CompanyFilter.TENANT_ID_FILTER) as ID;

      this.add({ where: {} });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.typeOrmFilter;
  }
}
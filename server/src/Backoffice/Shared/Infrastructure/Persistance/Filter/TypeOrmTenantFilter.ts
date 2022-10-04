import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { FindManyOptions } from "typeorm";

export class TypeOrmTenantFilter extends TypeOrmAdapter<FindManyOptions<TenantModel>> {
  constructor(private readonly filter: TenantFilter) {
    super();
  }

  public apply(): FindManyOptions<TenantModel> {
    const filters = this.filter.apply();

    if (filters.has(TenantFilter.EMAIL_FILTER)) {
      const email = filters.get(TenantFilter.EMAIL_FILTER) as Email;

      this.add({ where: { email } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.typeOrmFilter;
  }
}
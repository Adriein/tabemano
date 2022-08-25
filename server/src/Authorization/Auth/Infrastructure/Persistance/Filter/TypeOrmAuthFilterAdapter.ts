import { AuthFilter } from "Authorization/Auth/Domain/Filter/AuthFilter";
import { AuthModel } from "Authorization/Auth/Infrastructure/Persistance/Model/AuthModel";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { FindManyOptions } from "typeorm";

export class TypeOrmAuthFilterAdapter extends TypeOrmAdapter<FindManyOptions<AuthModel>> {
  constructor(private readonly filter: AuthFilter) {
    super();
  }

  public apply(): FindManyOptions<AuthModel> {
    const filters = this.filter.apply();

    if (filters.has(AuthFilter.EMAIL_FILTER)) {
      const email = filters.get(AuthFilter.EMAIL_FILTER) as Email;

      this.add({ where: { email } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.typeOrmFilter;
  }
}
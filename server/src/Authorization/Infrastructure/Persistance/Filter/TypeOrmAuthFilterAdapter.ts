import { Auth } from "Authorization/Domain/Entity/Auth";
import { AuthFilter } from "Authorization/Domain/Entity/AuthFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { Describer } from "Shared/Domain/types";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { FindManyOptions } from "typeorm";

export class TypeOrmAuthFilterAdapter extends TypeOrmAdapter<FindManyOptions<Auth>> {
  constructor(private readonly filter: AuthFilter) {
    super();
  }

  public apply(): FindManyOptions<Auth> {
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
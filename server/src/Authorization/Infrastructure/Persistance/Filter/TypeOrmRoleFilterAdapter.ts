import { RoleFilter } from "Authorization/Domain/Filter/RoleFilter";
import { AuthRoleModel } from "Authorization/Infrastructure/Persistance/Model/AuthRoleModel";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { FindManyOptions } from "typeorm";

export class TypeOrmRoleFilterAdapter extends TypeOrmAdapter<FindManyOptions<AuthRoleModel>> {
  constructor(private readonly filter: RoleFilter) {
    super();
  }

  public apply(): FindManyOptions<AuthRoleModel> {
    const filters = this.filter.apply();

    if (filters.has(RoleFilter.ROLE_TYPE_FILTER)) {
      const type = filters.get(RoleFilter.ROLE_TYPE_FILTER) as RoleType;

      this.add({ where: { type: type } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    return this.typeOrmFilter;
  }
}
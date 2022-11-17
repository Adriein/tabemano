import { RoleFilter } from 'Authorization/Auth/Domain/Filter/RoleFilter';
import { RoleModel } from 'Shared/Infrastructure/Persistance/Model/RoleModel';
import { Pagination } from 'Shared/Domain/Entities/Pagination';
import { RoleType } from 'Shared/Domain/Vo/RoleType';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class TypeOrmRoleFilterAdapter extends TypeOrmAdapter<FindManyOptions<RoleModel>> {
  constructor(private readonly filter: RoleFilter) {
    super();
  }

  public apply(): FindManyOptions<RoleModel> {
    const filters = this.filter.apply();

    if (filters.has(RoleFilter.ROLE_ID_FILTER)) {
      const id = filters.get(RoleFilter.ROLE_ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    if (filters.has(RoleFilter.ROLE_TYPE_FILTER)) {
      const type = filters.get(RoleFilter.ROLE_TYPE_FILTER) as RoleType;

      this.add({ where: { type: type } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination));
    }

    return this.typeOrmFilter;
  }
}

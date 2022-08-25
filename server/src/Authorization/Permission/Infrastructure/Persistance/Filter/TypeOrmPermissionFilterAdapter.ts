import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { UserModuleModel } from '../Model/UserModuleModel';

export class TypeOrmPermissionFilterAdapter extends TypeOrmAdapter<
  FindManyOptions<UserModuleModel>
> {
  constructor(private readonly filter: PermissionFilter) {
    super();
  }

  public apply(): FindManyOptions<UserModuleModel> {
    const filters = this.filter.apply();

    if (filters.has(PermissionFilter.MODULE_ID_FILTER)) {
      const moduleId = filters.get(PermissionFilter.MODULE_ID_FILTER) as ID;

      this.add({ where: { moduleId } });
    }

    if (filters.has(PermissionFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(PermissionFilter.TENANT_ID_FILTER);

      this.add({ where: { tenantId } });
    }

    return this.typeOrmFilter;
  }
}

import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { PermissionModel } from 'Shared/Infrastructure/Persistance/Model/PermissionModel';
import { FindManyOptions } from 'typeorm';

export class TypeOrmPermissionFilterAdapter extends TypeOrmAdapter<FindManyOptions<PermissionModel>> {
  constructor(private readonly filter: PermissionFilter) {
    super();
  }

  public apply(): FindManyOptions<PermissionModel> {
    const filters = this.filter.apply();

    this.add({ relations: { module: { urlList: true } } });

    if (filters.has(PermissionFilter.MODULE_ID_FILTER)) {
      const productId = filters.get(PermissionFilter.MODULE_ID_FILTER) as ID;

      this.add({ where: {} });
    }

    if (filters.has(PermissionFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(PermissionFilter.TENANT_ID_FILTER);

      this.add({ where: { tenantId } });
    }

    if (filters.has(PermissionFilter.MODULE_NAME)) {
      const moduleName = filters.get(PermissionFilter.MODULE_NAME);

      this.add({ where: { module: { name: moduleName } } });
    }

    return this.typeOrmFilter;
  }
}

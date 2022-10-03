import { PermissionFilter } from 'Authorization/Permission/Domain/Filter/PermissionFilter';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ModuleModel } from '../Model/ModuleModel';
import { PermissionModel } from '../Model/PermissionModel';

export class TypeOrmModuleFilterAdapter extends TypeOrmAdapter<FindManyOptions<ModuleModel>> {
  constructor(private readonly filter: PermissionFilter) {
    super();
  }

  public apply(): FindManyOptions<PermissionModel> {
    const filters = this.filter.apply();

    this.add({ relations: { urlList: true } });

    if (filters.has(PermissionFilter.MODULE_ID_FILTER)) {
      const id = filters.get(PermissionFilter.MODULE_ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    return this.typeOrmFilter;
  }
}

import { ModuleFilter } from 'Authorization/Permission/Domain/Filter/ModuleFilter';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ModuleModel } from '../../../../../../../Authorization/Permission/Infrastructure/Persistance/Model/ModuleModel';

export class TypeOrmModuleFilterAdapter extends TypeOrmAdapter<FindManyOptions<ModuleModel>> {
  constructor(private readonly filter: ModuleFilter) {
    super();
  }

  public apply(): FindManyOptions<ModuleModel> {
    const filters = this.filter.apply();

    this.add({ relations: { urlList: true } });

    if (filters.has(ModuleFilter.MODULE_ID_FILTER)) {
      const id = filters.get(ModuleFilter.MODULE_ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    return this.typeOrmFilter;
  }
}

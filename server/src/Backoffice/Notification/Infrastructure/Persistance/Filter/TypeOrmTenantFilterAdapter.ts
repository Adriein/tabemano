import { TenantFilter } from "Backoffice/Shared/Domain/Tenant/TenantFilter";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
import { FindManyOptions } from "typeorm";

export class TypeOrmTenantFilterAdapter extends TypeOrmAdapter<FindManyOptions<TenantModel>> {
  constructor(private readonly filter: TenantFilter) {
    super();
  }

  public apply(): FindManyOptions<TenantModel> {
    const filters = this.filter.apply();

    if (filters.has(TenantFilter.ID_FILTER)) {
      const id = filters.get(TenantFilter.ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    this.add({ relations: { company: true } })

    return this.typeOrmFilter;
  }
}
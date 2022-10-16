import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ThirdPartyServiceModel } from '../Model/ThirdPartyServiceModel';

export class TypeOrmPermissionFilterAdapter extends TypeOrmAdapter<
  FindManyOptions<ThirdPartyServiceModel>
> {
  constructor(private readonly filter: ThirdPartyServiceFilter) {
    super();
  }

  public apply(): FindManyOptions<ThirdPartyServiceFilter> {
    const filters = this.filter.apply();

    return this.typeOrmFilter;
  }
}

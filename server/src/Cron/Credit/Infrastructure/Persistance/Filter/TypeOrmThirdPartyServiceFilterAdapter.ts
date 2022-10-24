import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ThirdPartyServiceModel } from '../../../../../Shared/Infrastructure/Persistance/Model/ThirdPartyServiceModel';

export class TypeOrmThirdPartyServiceFilterAdapter extends TypeOrmAdapter<
  FindManyOptions<ThirdPartyServiceModel>
> {
  constructor(private readonly filter: ThirdPartyServiceFilter) {
    super();
  }

  public apply(): FindManyOptions<ThirdPartyServiceModel> {
    const filters = this.filter.apply();

    return this.typeOrmFilter;
  }
}

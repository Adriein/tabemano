import { ProductFilter } from 'Backoffice/Product/Domain/Filter/ProductFilter';
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { TypeOrmAdapter } from 'Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter';
import { FindManyOptions } from 'typeorm';
import { ProductModel } from 'Shared/Infrastructure/Persistance/Model/ProductModel';

export class TypeOrmProductFilterAdapter extends TypeOrmAdapter<FindManyOptions<ProductModel>> {
  constructor(private readonly filter: ProductFilter) {
    super();
  }

  public apply(): FindManyOptions<ProductModel> {
    const filters = this.filter.apply();

    this.add({ relations: { urlList: true } });

    if (filters.has(ProductFilter.PRODUCT_NAME_FILTER)) {
      const name = filters.get(ProductFilter.PRODUCT_NAME_FILTER) as Name;

      this.add({ where: { name } });
    }

    if (filters.has(ProductFilter.PRODUCT_ID)) {
      const id = filters.get(ProductFilter.PRODUCT_ID) as ID;

      this.add({ where: { id } });
    }

    return this.typeOrmFilter;
  }
}

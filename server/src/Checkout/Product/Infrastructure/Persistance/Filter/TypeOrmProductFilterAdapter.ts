import { ProductFilter } from "Checkout/Product/Domain/Filter/ProductFilter";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { ProductModel } from "Shared/Infrastructure/Persistance/Model/ProductModel";
import { FindManyOptions } from "typeorm";

export class TypeOrmProductFilterAdapter extends TypeOrmAdapter<FindManyOptions<ProductModel>> {
  constructor(private readonly filter: ProductFilter) {
    super();
  }

  public apply(): FindManyOptions<ProductModel> {
    const filters = this.filter.apply();

    if (filters.has(ProductFilter.COUNTRY_FILTER)) {
      const country = filters.get(ProductFilter.COUNTRY_FILTER) as Country;

      this.add({ where: { country } });
    }

    if (filters.has(ProductFilter.ACTIVE_FILTER)) {
      const active = filters.get(ProductFilter.ACTIVE_FILTER) as boolean;

      this.add({ where: { isActive: active } });
    }

    if (filters.has(ProductFilter.ID_FILTER)) {
      const id = filters.get(ProductFilter.ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    return this.typeOrmFilter;
  }
}
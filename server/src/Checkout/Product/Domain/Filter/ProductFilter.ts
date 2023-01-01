import { Filter } from "Shared/Domain/Entities/Filter";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class ProductFilter extends Filter {
  public static COUNTRY_FILTER = 'country';
  public static ACTIVE_FILTER = 'active';
  public static ID_FILTER = 'id';

  protected data: Map<string, any> = new Map();

  public static create(): ProductFilter {
    return new ProductFilter();
  }

  public withId(id: ID): this {
    this.data.set(ProductFilter.ID_FILTER, id);

    return this;
  }

  public withCountry(country: Country): this {
    this.data.set(ProductFilter.COUNTRY_FILTER, country);

    return this;
  }

  public isActive(): this {
    this.data.set(ProductFilter.ACTIVE_FILTER, true);

    return this;
  }

  apply(): Map<string, any> {
    return this.data;
  }

}
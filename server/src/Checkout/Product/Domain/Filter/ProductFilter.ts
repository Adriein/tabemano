import { Filter } from "Shared/Domain/Entities/Filter";
import { Country } from "Shared/Domain/Vo/Country.vo";

export class ProductFilter extends Filter {
  private static COUNTRY_FILTER = 'country';
  private static ACTIVE_FILTER = 'active';

  protected data: Map<string, any> = new Map();

  public static create(): ProductFilter {
    return new ProductFilter();
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
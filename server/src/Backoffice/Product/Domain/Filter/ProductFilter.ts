import { Filter } from 'Shared/Domain/Entities/Filter';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class ProductFilter extends Filter {
  public static MODULE_NAME_FILTER = 'name';

  public static create(): ProductFilter {
    return new ProductFilter();
  }

  protected data: Map<string, any> = new Map();


  public withModuleName(name: Name): this {
    this.data.set(ProductFilter.MODULE_NAME_FILTER, name);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
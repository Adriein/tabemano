import { Filter } from 'Shared/Domain/Entities/Filter';
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class ProductFilter extends Filter {
  public static PRODUCT_NAME_FILTER = 'name';
  public static PRODUCT_ID = 'id';

  public static create(): ProductFilter {
    return new ProductFilter();
  }

  protected data: Map<string, any> = new Map();


  public withModuleName(name: Name): this {
    this.data.set(ProductFilter.PRODUCT_NAME_FILTER, name);
    return this;
  }

  public withId(id: ID): this {
    this.data.set(ProductFilter.PRODUCT_ID, id);

    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
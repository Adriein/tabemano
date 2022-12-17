import { Filter } from 'Shared/Domain/Entities/Filter';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class ProductFilter extends Filter {
  public static PRODUCT_ID_FILTER = 'productId';

  public static create(): ProductFilter {
    return new ProductFilter();
  }

  protected data: Map<string, any> = new Map();

  public withProductId(id: ID): this {
    this.data.set(ProductFilter.PRODUCT_ID_FILTER, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}

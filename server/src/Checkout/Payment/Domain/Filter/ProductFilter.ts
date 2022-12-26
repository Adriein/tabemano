import { Filter } from "Shared/Domain/Entities/Filter";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class ProductFilter extends Filter {
  private static ID_FILTER = 'id';

  protected data: Map<string, any> = new Map();

  public static create(): ProductFilter {
    return new ProductFilter();
  }

  public withId(id: ID): this {
    this.data.set(ProductFilter.ID_FILTER, id);

    return this;
  }

  apply(): Map<string, any> {
    return this.data;
  }

}
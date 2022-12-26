import { Filter } from "Shared/Domain/Entities/Filter";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class CustomerFilter extends Filter {
  private static ID_FILTER = 'id';

  protected data: Map<string, any> = new Map();

  public static create(): CustomerFilter {
    return new CustomerFilter();
  }

  public withId(id: ID): this {
    this.data.set(CustomerFilter.ID_FILTER, id);

    return this;
  }

  apply(): Map<string, any> {
    return this.data;
  }

}
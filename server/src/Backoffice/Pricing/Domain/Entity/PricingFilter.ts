import { Filter } from "Shared/Domain/Entities/Filter";

export class PricingFilter extends Filter {
  public static NAME_FILTER = 'name';

  protected data: Map<string, any> = new Map();

  public withName(name: string): this {
    this.data.set(PricingFilter.NAME_FILTER, name);
    return this;
  };

  public apply(): Map<string, any> {
    return this.data;
  }
}
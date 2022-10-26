import { Filter } from 'Shared/Domain/Entities/Filter';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class ThirdPartyServiceFilter extends Filter {
  public static THIRD_PARTY_SERVICE_NAME = 'thirdPartyServiceName';

  public static create(): ThirdPartyServiceFilter {
    return new ThirdPartyServiceFilter();
  }

  protected data: Map<string, any> = new Map();

  public withThirdPartyServiceName(name: Name): this {
    this.data.set(ThirdPartyServiceFilter.THIRD_PARTY_SERVICE_NAME, name);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}

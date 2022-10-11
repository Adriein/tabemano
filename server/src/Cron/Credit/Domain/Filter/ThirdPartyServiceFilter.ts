import { Filter } from 'Shared/Domain/Entities/Filter';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class ThirdPartyServiceFilter extends Filter {
  public static THIRD_PARTY_SERVICE_ID = 'thirdPartyServiceId';

  public static create(): ThirdPartyServiceFilter {
    return new ThirdPartyServiceFilter();
  }

  protected data: Map<string, any> = new Map();

  public withThirdPartyServiceId(id: ID): this {
    this.data.set(ThirdPartyServiceFilter.THIRD_PARTY_SERVICE_ID, id);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}

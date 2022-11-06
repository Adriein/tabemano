import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';

export class ThirdPartyServiceObjectMother {
  public static create(): ThirdPartyServiceObjectMother {
    return new ThirdPartyServiceObjectMother();
  }

  public build(): ThirdPartyService {
    return ThirdPartyService.build(new Name('Mock'), new NumberVo(100), new NumberVo(20), true);
  }
}

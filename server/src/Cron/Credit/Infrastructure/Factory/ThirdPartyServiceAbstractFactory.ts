import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { IThirdPartyServiceAbstractFactory } from 'Shared/Domain/Factory/IThirdPartyServiceAbstractFactory';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { SendGridRemainingCreditService } from './SendGridRemainingCreditService';

export class ThirdPartyServiceAbstractFactory implements IThirdPartyServiceAbstractFactory {
  constructor(private readonly sendGridRemainingCreditService: SendGridRemainingCreditService) {}

  public createRemainingCreditServiceRetriever(serviceName: Name): IRemainingCreditService {
    if (serviceName.value === 'SendGrid') {
      return this.sendGridRemainingCreditService;
    }

    throw new Error();
  }
}

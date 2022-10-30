import { Inject, Injectable } from '@nestjs/common';
import { SENDGRID } from 'Shared/Domain/constants';
import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { IThirdPartyServiceAbstractFactory } from 'Shared/Domain/Factory/IThirdPartyServiceAbstractFactory';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { SendGridRemainingCreditService } from '../SendGrid/SendGridRemainingCreditService';

@Injectable()
export class ThirdPartyServiceAbstractFactory implements IThirdPartyServiceAbstractFactory {
  constructor(
    @Inject('SendGridRemainingCreditService')
    private readonly sendGridRemainingCreditService: SendGridRemainingCreditService
  ) {}

  public createRemainingCreditServiceRetriever(serviceName: Name): IRemainingCreditService {
    if (serviceName.value === SENDGRID) {
      return this.sendGridRemainingCreditService;
    }

    throw new Error();
  }
}

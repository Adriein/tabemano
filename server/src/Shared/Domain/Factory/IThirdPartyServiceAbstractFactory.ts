import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { Name } from '../Vo/Name.vo';

export interface IThirdPartyServiceAbstractFactory {
  createRemainingCreditServiceRetriever(serviceName: Name): IRemainingCreditService;
}

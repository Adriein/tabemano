import { IRemainingCreditService } from "Shared/Domain/Factory/IRemainingCreditService";

export interface IThirdPartyServiceAbstractFactory {
  createRemainingCreditServiceRetriever(): IRemainingCreditService;
}
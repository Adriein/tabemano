import { RemainingCreditResponse } from 'Cron/Credit/Domain/Entity/RemainingCreditResponse';

export interface IRemainingCreditService {
  execute(): Promise<RemainingCreditResponse>;
}

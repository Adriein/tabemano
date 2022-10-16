import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';
import { SendGridRequest } from 'Shared/Infrastructure/Service/SendGrid/SendGridRequest';

export class SendGridRemainingCreditService implements IRemainingCreditService {
  constructor(private readonly sendGrid: SendGridClient) {}

  public async execute(): Promise<number> {
    const request = new SendGridRequest(`/v3/user/credits`, 'GET');

    const remainingCredit = await this.sendGrid.makeRequest(request);

    // if (remainingCredit) {
    //   remainingCredit;
    // }

    throw new Error();
  }
}

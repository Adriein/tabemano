import { Inject, Injectable } from '@nestjs/common';
import { RemainingCreditResponse } from 'Cron/Credit/Domain/Entity/RemainingCreditResponse';
import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { SendGridClient } from 'Shared/Infrastructure/Service/SendGrid/SendGridClient';
import { SendGridRequest } from 'Shared/Infrastructure/Service/SendGrid/SendGridRequest';
import { SendGridRemainingCreditResponse } from './SendGridRemainingCreditResponse';

@Injectable()
export class SendGridRemainingCreditService implements IRemainingCreditService {
  constructor(@Inject('SendGrid') private readonly sendGrid: SendGridClient) {}

  public async execute(): Promise<RemainingCreditResponse> {
    const request = new SendGridRequest(`/v3/user/credits`, 'GET');

    const response = await this.sendGrid.makeRequest<
      SendGridRequest,
      SendGridRemainingCreditResponse
    >(request);

    return new RemainingCreditResponse(response.body()!.remain());
  }
}

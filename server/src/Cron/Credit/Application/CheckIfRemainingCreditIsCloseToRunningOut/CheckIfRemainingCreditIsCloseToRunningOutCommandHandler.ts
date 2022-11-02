import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { Log } from 'Shared/Domain/Decorators/Log';
import { GetThirdPartyServiceListService } from '../Services/GetThirdPartyServiceListService';
import { CheckIfRemainingCreditIsCloseToRunningOutCommand } from './CheckIfRemainingCreditIsCloseToRunningOut';

@CommandHandler(CheckIfRemainingCreditIsCloseToRunningOutCommand)
export class CheckIfRemainingCreditIsCloseToRunningOutCommandHandler {
  constructor(
    @Inject('GetThirdPartyServiceList')
    private readonly getThirdPartyServiceList: GetThirdPartyServiceListService
  ) {}

  @Log()
  public async execute(): Promise<void> {
    const filter = ThirdPartyServiceFilter.create();
    const serviceList = await this.getThirdPartyServiceList.execute(filter);

    serviceList.forEach(service => {
      if (!service.hasToBeNotified()) {
        return;
      }

      if (service.checkIfRemainingCreditIsCloseToRunningOut()) {
        // Send notification
      }

      return;
    });
  }
}

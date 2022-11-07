import { Inject } from '@nestjs/common';
import { CommandHandler } from '@nestjs/cqrs';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { Log } from 'Shared/Domain/Decorators/Log';
import { ThirdPartyServiceFinder } from '../Services/ThirdPartyServiceFinder';
import { CheckIfRemainingCreditIsCloseToRunningOutCommand } from './CheckIfRemainingCreditIsCloseToRunningOut';

@CommandHandler(CheckIfRemainingCreditIsCloseToRunningOutCommand)
export class CheckIfRemainingCreditIsCloseToRunningOutCommandHandler {
  constructor(
    @Inject('ThirdPartyServiceFinder')
    private readonly getThirdPartyServiceList: ThirdPartyServiceFinder
  ) {}

  @Log()
  public async execute(): Promise<void> {
    const filter = ThirdPartyServiceFilter.create();
    const thirdPartyServiceList = await this.getThirdPartyServiceList.execute(filter);

    thirdPartyServiceList.forEach(thirdPartyService => {
      thirdPartyService.isRemainingCreditCloseToRunningOut(thirdPartyService);

      thirdPartyService.commit();
    });
  }
}

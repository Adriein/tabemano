import { Inject } from '@nestjs/common';
import { CommandHandler, EventBus } from '@nestjs/cqrs';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { Log } from 'Shared/Domain/Decorators/Log';
import { ThirdPartyServiceFinder } from '../Services/ThirdPartyServiceFinder';
import { CheckIfRemainingCreditIsCloseToRunningOutCommand } from './CheckIfRemainingCreditIsCloseToRunningOut';
import { RemainingCreditRunOutDomainEvent } from './RemainingCreditRunOutDomainEvent';

@CommandHandler(CheckIfRemainingCreditIsCloseToRunningOutCommand)
export class CheckIfRemainingCreditIsCloseToRunningOutCommandHandler {
  constructor(
    @Inject('ThirdPartyServiceFinder')
    private readonly getThirdPartyServiceList: ThirdPartyServiceFinder,
    private readonly eventBus: EventBus
  ) {}

  @Log()
  public async execute(): Promise<void> {
    const filter = ThirdPartyServiceFilter.create();
    const thirdPartyServiceList = await this.getThirdPartyServiceList.execute(filter);

    thirdPartyServiceList.forEach(thirdPartyService => {
      // if (!thirdPartyService.hasToBeNotified()) {
      //   return;
      // }

      thirdPartyService.isRemainingCreditCloseToRunningOut(thirdPartyService);

      thirdPartyService.commit();
      // if (thirdPartyService.isRemainingCreditCloseToRunningOut(thirdPartyService)) {
      //   this.eventBus.publish(
      //     new RemainingCreditRunOutDomainEvent(
      //       thirdPartyService.id(),
      //       thirdPartyService.name(),
      //       thirdPartyService.remainingCredit().value
      //     )
      //   );
      // }

      return;
    });
  }
}

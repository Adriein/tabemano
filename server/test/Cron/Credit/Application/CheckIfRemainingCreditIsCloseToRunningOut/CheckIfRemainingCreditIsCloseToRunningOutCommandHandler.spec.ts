// import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CheckIfRemainingCreditIsCloseToRunningOutCommandHandler } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/CheckIfRemainingCreditIsCloseToRunningOutCommandHandler';
import { ThirdPartyServiceFinder } from 'Cron/Credit/Application/Services/ThirdPartyServiceFinder';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { ThirdPartyServiceObjectMother } from '../../../Shared/ThirdPartyServiceObjectMother';

describe('CheckIfRemainingCreditIsCloseToRunningOutCommandHandler', () => {
  let thirdPartyServiceFinder: ThirdPartyServiceFinder;
  let handler: CheckIfRemainingCreditIsCloseToRunningOutCommandHandler;
  // let eventBus: EventBus;
  const mockThirdPartyService = ThirdPartyServiceObjectMother.create().build();

  beforeEach(async () => {
    jest.resetAllMocks();

    const cronModule = await Test.createTestingModule({
      providers: [CheckIfRemainingCreditIsCloseToRunningOutCommandHandler],
    })
      .useMocker(token => {
        switch (token) {
          case 'ThirdPartyServiceFinder':
            return {
              execute: jest.fn().mockReturnValue(Promise.resolve([mockThirdPartyService])),
            };
        }
      })
      .compile();

    handler = cronModule.get(CheckIfRemainingCreditIsCloseToRunningOutCommandHandler);
    thirdPartyServiceFinder = cronModule.get<ThirdPartyServiceFinder>('ThirdPartyServiceFinder');
    // eventBus = cronModule.get<EventBus>(EventBus);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get a third party service list', async () => {
    jest.spyOn(thirdPartyServiceFinder, 'execute');

    const expected = [mockThirdPartyService];

    await handler.execute();

    expect(thirdPartyServiceFinder.execute).toBeCalledWith(expect.any(ThirdPartyServiceFilter));
    expect(thirdPartyServiceFinder.execute).toHaveBeenCalledTimes(1);
    expect(
      expected.every(thirdPartyService => thirdPartyService instanceof ThirdPartyService)
    ).toBeTruthy();
  });

  // it('should return early when notifications are deactivated', async () => {
  //   jest.spyOn(mockThirdPartyService, 'hasToBeNotified').mockReturnValue(false);
  //   jest.spyOn(eventBus, 'publish');

  //   await handler.execute();

  //   expect(mockThirdPartyService.hasToBeNotified).toHaveBeenCalled();
  //   expect(mockThirdPartyService.hasToBeNotified()).toBe(false);
  //   expect(eventBus.publish).toBeCalledTimes(0);
  // });
});

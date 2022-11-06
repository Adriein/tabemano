import { EventBus } from '@nestjs/cqrs';
import { Test } from '@nestjs/testing';
import { CheckIfRemainingCreditIsCloseToRunningOutCommandHandler } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/CheckIfRemainingCreditIsCloseToRunningOutCommandHandler';
import { GetThirdPartyServiceListService } from 'Cron/Credit/Application/Services/GetThirdPartyServiceListService';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { ThirdPartyServiceObjectMother } from '../../../Shared/ThirdPartyServiceObjectMother';

describe('CheckIfRemainingCreditIsCloseToRunningOutCommandHandler', () => {
  let thirdPartyServiceList: GetThirdPartyServiceListService;
  let handler: CheckIfRemainingCreditIsCloseToRunningOutCommandHandler;
  let eventBus: EventBus;
  const mockThirdPartyService = ThirdPartyServiceObjectMother.create().build();

  beforeEach(async () => {
    jest.resetAllMocks();

    const cronModule = await Test.createTestingModule({
      providers: [CheckIfRemainingCreditIsCloseToRunningOutCommandHandler],
    })
      .useMocker(token => {
        if (typeof token === 'function') {
          switch (token.name) {
            case 'EventBus':
              return { publish: jest.fn() };
          }

          return;
        }

        switch (token) {
          case 'GetThirdPartyServiceListService':
            return {
              execute: jest.fn().mockReturnValue(Promise.resolve([mockThirdPartyService])),
            };
        }
      })
      .compile();

    handler = cronModule.get(CheckIfRemainingCreditIsCloseToRunningOutCommandHandler);
    thirdPartyServiceList = cronModule.get<GetThirdPartyServiceListService>(
      'GetThirdPartyServiceListService'
    );
    eventBus = cronModule.get<EventBus>(EventBus);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should get a third party service list', async () => {
    jest.spyOn(thirdPartyServiceList, 'execute');

    await handler.execute();

    expect(thirdPartyServiceList.execute).toBeCalledWith(expect.any(ThirdPartyServiceFilter));
    expect(thirdPartyServiceList.execute).toHaveBeenCalledTimes(1);
    /*expect(thirdPartyServiceList.execute).toHaveReturnedWith(
      expect.arrayContaining(Promise.resolve([mockThirdPartyService]))
    );*/
  });

  it('should return early when notifications are deactivated', async () => {
    jest.spyOn(mockThirdPartyService, 'hasToBeNotified').mockReturnValue(false);
    jest.spyOn(eventBus, 'publish');

    await handler.execute();

    expect(mockThirdPartyService.hasToBeNotified).toHaveBeenCalled();
    expect(mockThirdPartyService.hasToBeNotified()).toBe(false);
    expect(eventBus.publish).toBeCalledTimes(0);
  });
});

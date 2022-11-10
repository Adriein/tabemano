import { Test } from '@nestjs/testing';
import { CheckIfRemainingCreditIsCloseToRunningOutCommandHandler } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/CheckIfRemainingCreditIsCloseToRunningOutCommandHandler';
import { ThirdPartyServiceFinder } from 'Cron/Credit/Application/Services/ThirdPartyServiceFinder';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { ThirdPartyServiceObjectMother } from '../../../Shared/ThirdPartyServiceObjectMother';

describe('CheckIfRemainingCreditIsCloseToRunningOutCommandHandler', () => {
  let thirdPartyServiceFinder: ThirdPartyServiceFinder;
  let handler: CheckIfRemainingCreditIsCloseToRunningOutCommandHandler;
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

  it('should call isRemainingCreditCloseToRunningOut', async () => {
    jest.spyOn(mockThirdPartyService, 'isRemainingCreditCloseToRunningOut');

    await handler.execute();

    expect(mockThirdPartyService.isRemainingCreditCloseToRunningOut).toHaveBeenCalled();
  });

  it('should call commit', async () => {
    jest.spyOn(mockThirdPartyService, 'commit');

    await handler.execute();

    expect(mockThirdPartyService.commit).toHaveBeenCalled();
  });
});

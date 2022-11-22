import { RemainingCreditResponse } from 'Cron/Credit/Domain/Entity/RemainingCreditResponse';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';

describe('ThirdPartyService', () => {
  const remainingCreditResponse = new RemainingCreditResponse(4);
  const service = {
    execute: jest.fn().mockReturnValue(Promise.resolve(remainingCreditResponse)),
  };

  const remainingCredit = new NumberVo(20);
  const threshold = new NumberVo(15);

  const thirdPartyService = ThirdPartyService.build(
    new Name('Test'),
    remainingCredit,
    threshold,
    true
  );

  //It should update remaining credit
  it('should update remaining credit', () => {
    //mock service
    //make new of 3rd party service

    // const entity = ThirdPartyService.build();
    // const thirdPartyService = {
    //   _remainingCredit: new NumberVo(4),
    //   updateRemainingCredit: entity.updateRemainingCredit.bind(ThirdPartyService),
    // };

    thirdPartyService.updateRemainingCredit(service);

    //I call execute from service
    expect(service.execute).toHaveBeenCalled();

    //service.execute returns a RemainingCreditResponse
    // expect(service.execute).toHaveReturnedWith(RemainingCreditResponse);

    //remainingCredit has changed
    const expected = new NumberVo(remainingCreditResponse.remainingCredit());
    expect(remainingCredit).not.toEqual(expected);
  });

  //It should check if remaining credit is close to running out
  it('should check if remaining credit is close to running out', () => {
    thirdPartyService.isRemainingCreditCloseToRunningOut(thirdPartyService);
    //hasToBeNotified() has to be called
    //has to return
    //numberOfCreditsBeforeNotifying has to be called
    //event has to be published
  });

  it('should return early if notifications are deactivated', () => {
    jest.spyOn(thirdPartyService, 'hasToBeNotified').mockReturnValue(false);
  });
});

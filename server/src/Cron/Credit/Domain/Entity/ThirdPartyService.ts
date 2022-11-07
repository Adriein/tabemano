import { RemainingCreditRunOutDomainEvent } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/RemainingCreditRunOutDomainEvent';
import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { TabemanoEventBus } from 'Shared/Domain/Entities/TabemanoEventBus';
import { IRemainingCreditService } from 'Shared/Domain/Factory/IRemainingCreditService';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';

export class ThirdPartyService extends AggregateRoot {
  public static build(
    name: Name,
    remainingCredit: NumberVo,
    minRemainingCreditBeforeNotifying: NumberVo,
    hasToBeNotified: boolean
  ): ThirdPartyService {
    return new ThirdPartyService(
      ID.generate(),
      name,
      remainingCredit,
      minRemainingCreditBeforeNotifying,
      hasToBeNotified
    );
  }

  constructor(
    _id: ID,
    private readonly _name: Name,
    private _remainingCredit: NumberVo,
    private readonly _minRemainingCreditBeforeNotifying: NumberVo,
    private readonly _hasToBeNotified: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): Name {
    return this._name;
  }

  public remainingCredit(): NumberVo {
    return this._remainingCredit;
  }

  public minRemainingCreditBeforeNotifying(): NumberVo {
    return this._minRemainingCreditBeforeNotifying;
  }

  public hasToBeNotified(): boolean {
    return this._hasToBeNotified;
  }

  public async updateRemainingCredit(service: IRemainingCreditService): Promise<void> {
    const response = await service.execute();

    const remainingCredit = new NumberVo(response.remainingCredit());

    this._remainingCredit = remainingCredit;
  }

  public isRemainingCreditCloseToRunningOut(thirdPartyService: ThirdPartyService): void {
    if (!thirdPartyService.hasToBeNotified()) {
      return;
    }

    if (this.differenceBetweenRemainingCreditAndMinRemainingCreditBeforeNotifying() <= 0) {
      TabemanoEventBus.instance()!.publish(
        new RemainingCreditRunOutDomainEvent(
          thirdPartyService.id(),
          thirdPartyService.name(),
          thirdPartyService.remainingCredit().value
        )
      );
    }
  }

  public differenceBetweenRemainingCreditAndMinRemainingCreditBeforeNotifying(): number {
    return this.remainingCredit().value - this.minRemainingCreditBeforeNotifying().value;
  }
}

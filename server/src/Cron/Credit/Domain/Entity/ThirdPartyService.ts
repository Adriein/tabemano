import { AggregateRoot } from 'Shared/Domain/Entities/AggregateRoot';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';

export class ThirdPartyService extends AggregateRoot {
  constructor(
    _id: ID,
    private readonly _name: Name,
    private readonly _remainingCredit: number,
    private readonly _minRemainingCreditBeforeNotifying: number,
    private readonly _notify: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): Name {
    return this._name;
  }

  public remainingCredit(): number {
    return this._remainingCredit;
  }

  public minRemainingCreditBeforeNotifying(): number {
    return this._minRemainingCreditBeforeNotifying;
  }

  public notify(): boolean {
    return this._notify;
  }

  //   public async updateRemainingCredits(service: IThirdPartyServiceRetriever): void {
  //     await service.update(this)
  //   }
}

import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";

export class Subscription {
  constructor(
    private _id: ID,
    private _userId: ID,
    private _pricingId: ID,
    private _paymentDate: DateVo,
    private _validTo: DateVo,
    private _isActive: boolean,
    private _isExpired: boolean,
    private _pricingName: string,
    private _duration: number,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public id(): ID {
    return this._id;
  }

  public userId(): ID {
    return this._userId;
  }

  public pricingId(): ID {
    return this._pricingId;
  }

  public paymentDate(): DateVo {
    return this._paymentDate;
  }

  public validTo(): DateVo {
    return this._validTo;
  }

  public isActive(): boolean {
    return this._isActive;
  }

  public isExpired(): boolean {
    return this._isExpired;
  }

  public duration(): number {
    return this._duration;
  }

  public checkIsExpired = (): boolean => {
    return Time.before(this._validTo.value, Time.now());
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): boolean => {
    const warningDate = Time.subtract(this._validTo.value, daysToWarn)

    return Time.equal(Time.now(), warningDate);
  };


  public isExpirationDateOlderThan(days: number) {
    const diff = Time.diff(Time.now(), this._validTo.value);

    return diff >= days;
  }
}
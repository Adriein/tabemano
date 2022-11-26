import { SubscriptionAboutToExpireDomainEvent } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionAboutToExpireDomainEvent";
import { SubscriptionExpired } from "Cron/Client/Application/CheckExpiredSubscriptions/SubscriptionExpired";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { TabemanoEventBus } from "Shared/Domain/Entities/TabemanoEventBus";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";

export class Subscription extends AggregateRoot {
  constructor(
    _id: ID,
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
  ) {
    super(_id);
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

  public checkIsExpired = (): void => {
    if (Time.before(this._validTo.value, Time.now())) {
      this.apply(new SubscriptionExpired(this._userId));
    }
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): void => {
    const warningDate = Time.subtract(this._validTo.value, daysToWarn)

    if (Time.equal(Time.now(), warningDate)) {
      this.apply(new SubscriptionAboutToExpireDomainEvent(this._userId))
    }
  };
}
import { SUBSCRIPTION_STATUS } from "Backoffice/Shared/constants";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { SubscriptionEventCollection } from "Backoffice/Shared/Domain/Subscription/SubscriptionEventCollection";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DomainEventsManager } from "Shared/Domain/Entities/DomainEventsManager";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";


export class Subscription extends AggregateRoot {
  public static build(
    userId: ID,
    pricingId: ID,
    lastPayment: DateVo,
    pricingDuration: number,
  ): Subscription {
    const event = SubscriptionEvent.build(SUBSCRIPTION_STATUS.CREATED);
    return new Subscription(
      ID.generate(),
      userId,
      pricingId,
      lastPayment,
      Subscription.expirationDate(lastPayment, pricingDuration),
      true,
      false,
      SubscriptionEventCollection.build([ event ])
    );
  }

  constructor(
    _id: ID,
    private _userId: ID,
    private _pricingId: ID,
    private _lastPayment: DateVo,
    private _validTo: DateVo,
    private _isActive: boolean,
    private _isExpired: boolean,
    private _events: SubscriptionEventCollection,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public pricingId = (): string => {
    return this._pricingId.value;
  }

  public paymentDate = (): Date => {
    return this._lastPayment.value;
  };

  public validTo(): Date {
    return this._validTo.value;
  }

  public isActive = (): boolean => {
    return this._isActive;
  };

  public userId = (): ID => {
    return this._userId;
  }

  public isExpired = (): boolean => {
    return this._isExpired;
  };

  public events(): SubscriptionEventCollection {
    return this._events;
  }

  public static expirationDate = (lastPaymentDate: DateVo, pricingDuration: number): DateVo => {
    return new DateVo(Time.add(lastPaymentDate.value, pricingDuration));
  }

  private addEventToHistory(event: SubscriptionEvent): void {
    this.entityUpdated();
    this._events.add(event);
  }

  public checkIsExpired = (pricingDuration: number): void => {
    const expirationDate = Subscription.expirationDate(this._lastPayment, pricingDuration);
    if (Time.equal(Time.now(), expirationDate.value)) {
      this._isExpired = true;
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED));
    }
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): void => {
    const expirationDate = Time.add(this._lastPayment.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    const isAboutToExpire = Time.equal(Time.now(), warningDate);

    if (isAboutToExpire) {
      //this.addEvent(new SendAboutToExpireEmailDomainEvent(this.id(), this.userId()));
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE));
      DomainEventsManager.publishEvents(this.id());
    }
  };

  public isAboutToExpire(): boolean {
    return this._events.containsEvent(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE);
  }

  public isExpirationDateOlderThan(days: number) {
    const diff = Time.diff(Time.now(), this.validTo());

    return diff >= days;
  }

  public deactivate = (): void => {
    this._isActive = false;
    this._isExpired = true;

    const isExpired = this._events.containsEvent(SUBSCRIPTION_STATUS.EXPIRED);

    if (!isExpired) {
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED));
    }

    this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.INACTIVE));
    this.entityUpdated();
  }
}
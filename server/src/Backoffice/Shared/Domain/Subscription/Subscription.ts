import { SUBSCRIPTION_STATUS } from "Backoffice/Shared/constants";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { SubscriptionEventCollection } from "Backoffice/Shared/Domain/Subscription/SubscriptionEventCollection";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";


export class Subscription extends AggregateRoot {
  public static build(
    userId: ID,
    lastPayment: DateVo,
    pricingId: ID,
    pricingName: string,
    pricingDuration: number,
    pricingAmount: number,
  ): Subscription {
    const subscriptionId = ID.generate();
    const event = SubscriptionEvent.build(SUBSCRIPTION_STATUS.CREATED, subscriptionId);
    return new Subscription(
      subscriptionId,
      pricingId,
      lastPayment,
      Subscription.expirationDate(lastPayment, pricingDuration),
      true,
      false,
      pricingName,
      pricingDuration,
      pricingAmount,
      SubscriptionEventCollection.build([ event ]),
      userId,
      undefined
    );
  }

  public static buildTenant(
    tenantId: ID,
    lastPayment: DateVo,
    pricingId: ID,
    pricingName: string,
    pricingDuration: number,
    pricingAmount: number,
  ): Subscription {
    const subscriptionId = ID.generate();
    const event = SubscriptionEvent.build(SUBSCRIPTION_STATUS.CREATED, subscriptionId);
    return new Subscription(
      subscriptionId,
      pricingId,
      lastPayment,
      Subscription.expirationDate(lastPayment, pricingDuration),
      true,
      false,
      pricingName,
      pricingDuration,
      pricingAmount,
      SubscriptionEventCollection.build([ event ]),
      undefined,
      tenantId
    );
  }

  constructor(
    _id: ID,
    private _pricingId: ID,
    private _paymentDate: DateVo,
    private _validTo: DateVo,
    private _isActive: boolean,
    private _isExpired: boolean,
    private _pricingName: string,
    private _duration: number,
    private _price: number,
    private _events: SubscriptionEventCollection,
    private _userId?: ID,
    private _tenantId?: ID,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public userId(): ID | undefined {
    return this._userId;
  }

  public tenantId(): ID | undefined {
    return this._tenantId;
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

  public pricingName(): string {
    return this._pricingName;
  }

  public duration(): number {
    return this._duration;
  }

  public price(): number {
    return this._price;
  }

  public events(): SubscriptionEventCollection {
    return this._events;
  }

  public static expirationDate = (lastPaymentDate: DateVo, pricingDuration: number): DateVo => {
    return new DateVo(Time.add(lastPaymentDate.value, pricingDuration));
  }

  private addEventToHistory(event: SubscriptionEvent): void {
    this._events.add(event);
  }

  public checkIsExpired = (): boolean => {
    const expirationDate = Subscription.expirationDate(this._paymentDate, this._duration);
    return Time.equal(Time.now(), expirationDate.value);
  }

  public makeExpired(): void {
    this._isExpired = true;
    this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED, this.id()));
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): void => {
    const expirationDate = Time.add(this._paymentDate.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    const isAboutToExpire = Time.equal(Time.now(), warningDate);

    if (isAboutToExpire) {
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE, this.id()));
    }
  };

  public isAboutToExpire(): boolean {
    return this._events.containsEvent(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE);
  }

  public isExpirationDateOlderThan(days: number) {
    const diff = Time.diff(Time.now(), this._validTo.value);

    return diff >= days;
  }

  public deactivate = (): void => {
    this._isActive = false;
    this._isExpired = true;

    const isExpired = this._events.containsEvent(SUBSCRIPTION_STATUS.EXPIRED);

    if (!isExpired) {
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED, this.id()));
    }

    this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.INACTIVE, this.id()));
  }
}
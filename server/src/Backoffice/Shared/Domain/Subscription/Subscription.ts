import { SubscriptionMarkedAsAboutToExpireDomainEvent } from "Backoffice/Client/Application/CheckAboutToExpireSubscriptions/SubscriptionMarkedAsAboutToExpireDomainEvent";
import { SUBSCRIPTION_STATUS } from "Backoffice/Shared/constants";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { SubscriptionEventCollection } from "Backoffice/Shared/Domain/Subscription/SubscriptionEventCollection";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Time } from "Shared/Infrastructure/Helper/Time";


export class Subscription extends Aggregate {
  public static build(
    userId: ID,
    lastPayment: DateVo,
    price: Pricing,
  ): Subscription {
    const event = SubscriptionEvent.build(SUBSCRIPTION_STATUS.CREATED);
    return new Subscription(
      ID.generate(),
      userId,
      lastPayment,
      Subscription.expirationDate(lastPayment, price.duration()),
      true,
      false,
      price,
      SubscriptionEventCollection.build([ event ]),
    );
  }

  constructor(
    readonly id: ID,
    readonly userId: ID,
    readonly lastPayment: DateVo,
    readonly validTo: DateVo,
    public isActive: boolean,
    public isExpired: boolean,
    readonly pricing: Pricing,
    readonly events: SubscriptionEventCollection,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    super(id, createdAt, updatedAt);
  }

  public pricingId = (): ID => {
    return this.pricing.id();
  }


  public pricingName(): string {
    return this.pricing.name();
  }

  public duration(): number {
    return this.pricing.duration();
  }

  public price(): number {
    return this.pricing.price();
  }

  public static expirationDate = (lastPaymentDate: DateVo, pricingDuration: number): DateVo => {
    return new DateVo(Time.add(lastPaymentDate.value, pricingDuration));
  }

  private addEventToHistory(event: SubscriptionEvent): void {
    this.events.add(event);
  }

  public checkIsExpired = (): boolean => {
    const expirationDate = Subscription.expirationDate(this.lastPayment, this.pricing.duration());
    return Time.equal(Time.now(), expirationDate.value);
  }

  public makeExpired(): void {
    this.isExpired = true;
    this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED));
  }

  public checkIsAboutToExpire = (daysToWarn: number | undefined = 5): void => {
    const expirationDate = Time.add(this.lastPayment.value, 5);
    const warningDate = Time.subtract(expirationDate, daysToWarn)

    const isAboutToExpire = Time.equal(Time.now(), warningDate);

    if (isAboutToExpire) {
      this.publish(new SubscriptionMarkedAsAboutToExpireDomainEvent(this.id, this.userId));
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE));
    }
  };

  public isAboutToExpire(): boolean {
    return this.events.containsEvent(SUBSCRIPTION_STATUS.ABOUT_TO_EXPIRE);
  }

  public isExpirationDateOlderThan(days: number) {
    const diff = Time.diff(Time.now(), this.validTo.value);

    return diff >= days;
  }

  public deactivate = (): void => {
    this.isActive = false;
    this.isExpired = true;

    const isExpired = this.events.containsEvent(SUBSCRIPTION_STATUS.EXPIRED);

    if (!isExpired) {
      this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.EXPIRED));
    }

    this.addEventToHistory(SubscriptionEvent.build(SUBSCRIPTION_STATUS.INACTIVE));
  }
}
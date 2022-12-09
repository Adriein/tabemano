import { Filter } from "Shared/Domain/Entities/Filter";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";

export class UserFilter extends Filter {
  public static ID_FILTER = 'id';
  public static TENANT_ID_FILTER = 'tenantId';
  public static EMAIL_FILTER = 'email';
  public static ROLE_FILTER = 'roleType';
  public static ACTIVE_FILTER = 'isActive';
  public static CONFIG_ALLOW_SEND_WARNINGS_FILTER = 'sendWarnings';
  public static CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER = 'sendNotifications';
  public static SUBSCRIPTION_PRICING_NAME_FILTER = 'pricingName';
  public static SUBSCRIPTION_DURATION_FILTER = 'pricingDuration';
  public static SUBSCRIPTION_AMOUNT_FILTER = 'pricingAmount';
  public static SUBSCRIPTION_VALID_TO_FILTER = 'validTo';
  public static SUBSCRIPTION_PAYMENT_DATE_FILTER = 'paymentDate';
  public static SUBSCRIPTION_IS_ACTIVE_FILTER = 'subscriptionIsActive';
  public static SUBSCRIPTION_IS_EXPIRED_FILTER = 'subscriptionIsExpired';

  public static create(): UserFilter {
    return new UserFilter();
  }

  protected data: Map<string, any> = new Map();

  public withId(id: ID): this {
    this.data.set(UserFilter.ID_FILTER, id);
    return this;
  }

  public withTenantId(id: ID): this {
    this.data.set(UserFilter.TENANT_ID_FILTER, id);
    return this;
  }

  public withEmail(email: Email): this {
    this.data.set(UserFilter.EMAIL_FILTER, email);
    return this;
  };

  public withRole(roleType: RoleType): this {
    this.data.set(UserFilter.ROLE_FILTER, roleType);
    return this;
  }

  public isActive(isActive: boolean): this {
    this.data.set(UserFilter.ACTIVE_FILTER, isActive);
    return this;
  }

  public withPricingName(name: string): this {
    this.data.set(UserFilter.SUBSCRIPTION_PRICING_NAME_FILTER, name);
    return this;
  }

  public withSubscriptionDuration(duration: number): this {
    this.data.set(UserFilter.SUBSCRIPTION_DURATION_FILTER, duration);
    return this;
  }

  public withSubscriptionPrice(amount: NumberVo): this {
    this.data.set(UserFilter.SUBSCRIPTION_AMOUNT_FILTER, amount);
    return this;
  }

  public withAllowSendWarnings(allow: boolean) {
    this.data.set(UserFilter.CONFIG_ALLOW_SEND_WARNINGS_FILTER, allow);
    return this;
  }

  public withAllowSendNotifications(allow: boolean) {
    this.data.set(UserFilter.CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER, allow);
    return this;
  }

  public withSubscriptionValidTo(validTo: DateVo) {
    this.data.set(UserFilter.SUBSCRIPTION_VALID_TO_FILTER, validTo);
    return this;
  }

  public withSubscriptionPaymentOn(paymentDate: DateVo) {
    this.data.set(UserFilter.SUBSCRIPTION_PAYMENT_DATE_FILTER, paymentDate);
    return this;
  }

  public withSubscriptionActive(isActive: boolean) {
    this.data.set(UserFilter.SUBSCRIPTION_IS_ACTIVE_FILTER, isActive);
    return this;
  }

  public withSubscriptionExpired(isExpired: boolean) {
    this.data.set(UserFilter.SUBSCRIPTION_IS_EXPIRED_FILTER, isExpired);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
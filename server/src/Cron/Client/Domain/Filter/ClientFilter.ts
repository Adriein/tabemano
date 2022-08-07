import { Filter } from "Shared/Domain/Entities/Filter";

export class ClientFilter extends Filter {

  public static ACTIVE_FILTER = 'isActive';
  public static CONFIG_ALLOW_SEND_WARNINGS_FILTER = 'sendWarnings';
  public static CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER = 'sendNotifications';
  public static SUBSCRIPTION_IS_ACTIVE_FILTER = 'subscriptionIsActive';
  public static SUBSCRIPTION_IS_EXPIRED_FILTER = 'subscriptionIsExpired';

  public static create(): ClientFilter {
    return new ClientFilter();
  }

  protected data: Map<string, any> = new Map();

  public isActive(isActive: boolean): this {
    this.data.set(ClientFilter.ACTIVE_FILTER, isActive);
    return this;
  }

  public withAllowSendWarnings(allow: boolean) {
    this.data.set(ClientFilter.CONFIG_ALLOW_SEND_WARNINGS_FILTER, allow);
    return this;
  }

  public withAllowSendNotifications(allow: boolean) {
    this.data.set(ClientFilter.CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER, allow);
    return this;
  }

  public withSubscriptionActive(isActive: boolean) {
    this.data.set(ClientFilter.SUBSCRIPTION_IS_ACTIVE_FILTER, isActive);
    return this;
  }

  public withSubscriptionExpired(isExpired: boolean) {
    this.data.set(ClientFilter.SUBSCRIPTION_IS_EXPIRED_FILTER, isExpired);
    return this;
  }

  public apply(): Map<string, any> {
    return this.data;
  }
}
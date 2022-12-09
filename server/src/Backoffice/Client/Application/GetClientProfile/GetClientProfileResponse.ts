import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { GetClientProfileResponseType, SubscriptionResponse } from "Backoffice/Client/types";
import { Serializable } from "Backoffice/Shared/Domain/Serializable";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionEvent } from "Backoffice/Shared/Domain/Subscription/SubscriptionEvent";
import { Time } from "Shared/Infrastructure/Helper/Time";

export class GetClientProfileResponse implements Serializable {
  public static fromDomain(client: Client, subscriptions: Subscription[]): GetClientProfileResponse {
    return new GetClientProfileResponse(client, subscriptions);
  }

  constructor(private client: Client, private subscriptions: Subscription[]) {}

  public serialize(): GetClientProfileResponseType {
    const subscriptionResponse = this.mountSubscriptionResponse();

    const spent = this.client.moneySpent(this.subscriptions);
    const monthlyRecurringRevenue = this.client.monthlyRecurringRevenue(this.subscriptions);

    return {
      id: this.client.id().value,
      username: this.client.name().value,
      email: this.client.email().value,
      active: this.client.isActive(),
      config: {
        sendWarnings: this.client.canSendWarnings(),
        language: this.client.language(),
        sendNotifications: this.client.canSendNotifications(),
        role: this.client.roleId().value
      },
      subscription: subscriptionResponse,
      revenue: {
        since: Time.format(this.client.createdAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        spent: `${spent} €`,
        monthlyRecurringRevenue: `${monthlyRecurringRevenue} €`
      }
    }
  }

  private mountSubscriptionResponse(): SubscriptionResponse[] {
    const response = [];

    for (const subscription of this.subscriptions) {
      response.push({
        id: subscription.id().value,
        pricing: {
          id: 'subscription.pricingId',
          price: subscription.price().amount().value,
          currency: subscription.price().currency().value,
          name: subscription.pricingName(),
          duration: subscription.duration()
        },
        lastPayment: Time.format(subscription.paymentDate().value, Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        validTo: Time.format(subscription.validTo().value, Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        isExpired: subscription.isExpired(),
        isActive: subscription.isActive(),
        history: this.mountSubscriptionEventsResponse(subscription)
      });
    }

    return response;
  }

  private mountSubscriptionEventsResponse(subscription: Subscription) {
    return subscription.events().data().map((event: SubscriptionEvent) => {
      return {
        event: event.event(),
        createdAt: Time.format(event.createdAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
        updatedAt: Time.format(event.updatedAt(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      }
    });
  }

}

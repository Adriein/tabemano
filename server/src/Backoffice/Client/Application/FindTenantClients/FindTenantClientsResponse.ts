import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { Time } from "Shared/Infrastructure/Helper/Time";

export class FindTenantClientsResponse {
  public static build(client: Client, subscription: Subscription): FindTenantClientsResponse {
    return new FindTenantClientsResponse(
      client.id().value,
      client.name().value,
      client.email().value,
      client.isActive(),
      client.sendWarnings(),
      subscription.pricingName(),
      Time.format(subscription.validTo(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      Time.format(subscription.paymentDate(), Time.AMERICAN_BEAUTIFIED_DATE_FORMAT),
      subscription.isExpired()
    )
  }

  constructor(
    private _id: string,
    private _username: string,
    private _email: string,
    private _active: boolean,
    private _sendWarnings: boolean,
    private _pricingName: string,
    private _validTo: string,
    private _lastPaymentDate: string,
    private _isSubscriptionExpired: boolean
  ) {}

  public serialize() {
    return {
      id: this._id,
      username: this._username,
      email: this._email,
      active: this._active,
      sendWarnings: this._sendWarnings,
      pricingName: this._pricingName,
      validTo: this._validTo,
      lastPaymentDate: this._lastPaymentDate,
      isSubscriptionExpired: this._isSubscriptionExpired
    }
  }
}
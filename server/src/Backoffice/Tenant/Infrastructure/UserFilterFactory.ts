import { IFilterFactory } from "Backoffice/Shared/Domain/Services/IFilterFactory";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class UserFilterFactory implements IFilterFactory<UserFilter> {
  public create(query: FindTenantClientsQuery): UserFilter {
    const filter = new UserFilter();

    for (const { entity, field, value } of query.filters) {
      switch (entity) {
        case 'user':
          filter.isActive(Boolean(value));
          continue;
        case 'pricing':
          if (field === 'duration') {
            filter.withSubscriptionDuration(Number(value));
          }
          if (field === 'amount') {
            filter.withSubscriptionPrice(Number(value));
          }
          if (field === 'pricing_name') {
            filter.withPricingName(value);
          }
          continue;
        case 'config':
          if (field === 'send_warnings') {
            filter.withAllowSendWarnings(Boolean(value));
          }
          if (field === 'send_notifications') {
            filter.withAllowSendNotifications(Boolean(value));
          }
          continue;
        case 'subscription':
          if (field === 'valid_to') {
            filter.withSubscriptionValidTo(new DateVo(value));
          }
          if (field === 'payment_date') {
            filter.withSubscriptionPaymentOn(new DateVo(value));
          }
          if (field === 'active') {
            filter.withSubscriptionActive(Boolean(value));
          }
          if (field === 'expired') {
            filter.withSubscriptionExpired(Boolean(value));
          }
      }
    }

    filter
      .withTenantId(new ID(query.tenantId))
      .paginate()
      .setPage(query.page)
      .setQuantity(query.quantity);

    return filter;
  }
}
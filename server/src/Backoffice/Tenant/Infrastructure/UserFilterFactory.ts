import { IFilterFactory } from "Backoffice/Shared/Domain/Services/IFilterFactory";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { FindTenantClientsQuery } from "Backoffice/Client/Application/FindTenantClients/FindTenantClientsQuery";
import { DateVo } from "Shared/Domain/Vo/Date.vo";

export class UserFilterFactory implements IFilterFactory<UserFilter> {
  public create(query: FindTenantClientsQuery): UserFilter {
    const filter = new UserFilter();

    for (const reqFilter of query.filters) {
      switch (reqFilter.entity) {
        case 'user':
          filter.isActive(Boolean(reqFilter.value));
          continue;
        case 'pricing':
          if (reqFilter.field === 'duration') {
            filter.withSubscriptionDuration(Number(reqFilter.value));
          }
          if (reqFilter.field === 'amount') {
            filter.withSubscriptionPrice(Number(reqFilter.value));
          }
          if (reqFilter.field === 'pricing_name') {
            filter.withPricingName(reqFilter.value);
          }
          continue;
        case 'config':
          if (reqFilter.field === 'send_warnings') {
            filter.withAllowSendWarnings(Boolean(reqFilter.value));
          }
          if (reqFilter.field === 'send_notifications') {
            filter.withAllowSendNotifications(Boolean(reqFilter.value));
          }
          continue;
        case 'subscription':
          if (reqFilter.field === 'valid_to') {
            filter.withSubscriptionValidTo(new DateVo(reqFilter.value));
          }
          if (reqFilter.field === 'payment_date') {
            filter.withSubscriptionPaymentOn(new DateVo(reqFilter.value));
          }
          if (reqFilter.field === 'active') {
            filter.withSubscriptionActive(Boolean(reqFilter.value));
          }
          if (reqFilter.field === 'expired') {
            filter.withSubscriptionExpired(Boolean(reqFilter.value));
          }
      }
    }

    filter.paginate()
      .setPage(query.page)
      .setQuantity(query.quantity);

    return filter;
  }

}
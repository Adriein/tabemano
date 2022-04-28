import { IFilterFactory } from "Backoffice/Shared/Domain/Services/IFilterFactory";
import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { FindTenantClientsQuery } from "Backoffice/Tenant/Application/FindTenantClients/FindTenantClientsQuery";

export class UserFilterFactory implements IFilterFactory<UserFilter> {
  public create(query: FindTenantClientsQuery): UserFilter {
    const filter = new UserFilter();

    for (const reqFilter of query.filters) {

    }

    filter.paginate()
      .setPage(query.page)
      .setQuantity(query.quantity);

    return filter;
  }

}
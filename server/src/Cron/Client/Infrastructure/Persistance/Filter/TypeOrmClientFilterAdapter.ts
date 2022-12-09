import { UserFilter } from "Backoffice/Shared/Domain/User/UserFilter";
import { ClientFilter } from "Cron/Client/Domain/Filter/ClientFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { RoleType } from "Shared/Domain/Vo/RoleType";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";
import { FindManyOptions } from "typeorm";

export class TypeOrmClientFilterAdapter extends TypeOrmAdapter<FindManyOptions<UserModel>> {
  constructor(private readonly filter: ClientFilter) {
    super();
  }

  public apply(): FindManyOptions<UserModel> {
    const filters = this.filter.apply();

    if (filters.has(UserFilter.ID_FILTER)) {
      const id = filters.get(UserFilter.ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    if (filters.has(UserFilter.TENANT_ID_FILTER)) {
      const tenantId = filters.get(UserFilter.TENANT_ID_FILTER) as ID;

      this.add({ where: { tenantId } });
    }

    if (filters.has(UserFilter.EMAIL_FILTER)) {
      const email = filters.get(UserFilter.EMAIL_FILTER) as Email;

      this.add({ where: { email } });
    }

    if (filters.has(UserFilter.ROLE_FILTER)) {
      const roleType = filters.get(UserFilter.ROLE_FILTER) as RoleType;

      //this.add({ where: { role: { type: roleType } } });
    }

    if (filters.has(UserFilter.ACTIVE_FILTER)) {
      const isActive = filters.get(UserFilter.ACTIVE_FILTER) as boolean;

      this.add({ where: { isActive } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_IS_ACTIVE_FILTER)) {
      const isSubscriptionActive = filters.get(UserFilter.SUBSCRIPTION_IS_ACTIVE_FILTER) as boolean;

      this.add({ where: { subscriptions: { isActive: isSubscriptionActive } } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_IS_EXPIRED_FILTER)) {
      const isSubscriptionExpired = filters.get(UserFilter.SUBSCRIPTION_IS_EXPIRED_FILTER) as boolean;

      this.add({ where: { subscriptions: { isExpired: isSubscriptionExpired } } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_PAYMENT_DATE_FILTER)) {
      const paymentDate = filters.get(UserFilter.SUBSCRIPTION_PAYMENT_DATE_FILTER) as DateVo;

      this.add({ where: { subscriptions: {} } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_VALID_TO_FILTER)) {
      const validTo = filters.get(UserFilter.SUBSCRIPTION_VALID_TO_FILTER) as DateVo;

      this.add({ where: { subscriptions: {} } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_AMOUNT_FILTER)) {
      const amount = filters.get(UserFilter.SUBSCRIPTION_AMOUNT_FILTER) as NumberVo;

      this.add({ where: { subscriptions: { price: amount } } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_DURATION_FILTER)) {
      const duration = filters.get(UserFilter.SUBSCRIPTION_DURATION_FILTER) as number;

      this.add({ where: { subscriptions: { duration } } });
    }

    if (filters.has(UserFilter.SUBSCRIPTION_PRICING_NAME_FILTER)) {
      const pricingName = filters.get(UserFilter.SUBSCRIPTION_PRICING_NAME_FILTER) as string;

      this.add({ where: { subscriptions: { pricingName } } });
    }

    if (filters.has(UserFilter.CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER)) {
      const sendNotifications = filters.get(UserFilter.CONFIG_ALLOW_SEND_NOTIFICATIONS_FILTER) as boolean;

      this.add({ where: { config: { sendNotifications } } });
    }

    if (filters.has(UserFilter.CONFIG_ALLOW_SEND_WARNINGS_FILTER)) {
      const sendWarnings = filters.get(UserFilter.CONFIG_ALLOW_SEND_WARNINGS_FILTER) as boolean;

      this.add({ where: { config: { sendWarnings } } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    this.add({ relations: { config: true, subscriptions: true, role: true } });

    return this.typeOrmFilter;
  }
}
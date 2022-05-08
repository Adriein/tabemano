import { Prisma } from "@prisma/client";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { PrismaAdapter } from "Shared/Infrastructure/Data/PrismaAdapter";

export class PrismaSubscriptionFilterAdapter extends PrismaAdapter<Prisma.ta_subscriptionFindManyArgs> {
  constructor(private readonly filter: SubscriptionFilter) {
    super();
  }

  public apply(): Prisma.ta_subscriptionFindManyArgs {
    const filters = this.filter.apply();

    if (filters.has(SubscriptionFilter.ACTIVE_FILTER)) {
      const isActive = filters.get(SubscriptionFilter.ACTIVE_FILTER) as boolean;

      this.add({ where: { su_is_active: isActive } });
    }

    if (filters.has(SubscriptionFilter.CLIENT_ID_FILTER)) {
      const id = filters.get(SubscriptionFilter.CLIENT_ID_FILTER) as ID;

      this.add({ where: { su_user_id: id.value } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    if (filters.has(Order.ORDER_FILTER)) {
      const order = filters.get(Order.ORDER_FILTER).build();

      if (order.has(SubscriptionFilter.CREATION_DATE_FILTER)) {
        const direction = order.get(SubscriptionFilter.CREATION_DATE_FILTER);

        this.add({ orderBy: { su_created_at: direction } });
      }
    }

    this.add({ include: { su_events: true } });

    return this.prismaFilter;
  }
}
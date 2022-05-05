import { Prisma } from "@prisma/client";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { Pagination } from "Shared/Domain/Entities/Pagination";
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

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    this.add({ include: { su_events: true } });

    return this.prismaFilter;
  }
}
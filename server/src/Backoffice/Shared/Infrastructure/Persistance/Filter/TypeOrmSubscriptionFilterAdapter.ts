import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { Order } from "Shared/Domain/Entities/Order";
import { Pagination } from "Shared/Domain/Entities/Pagination";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { TypeOrmAdapter } from "Shared/Infrastructure/Persistance/Adapter/TypeOrmAdapter";
import { FindManyOptions } from "typeorm";

export class TypeOrmSubscriptionFilterAdapter extends TypeOrmAdapter<FindManyOptions<SubscriptionModel>> {
  constructor(private readonly filter: SubscriptionFilter) {
    super();
  }

  public apply(): FindManyOptions<SubscriptionModel> {
    const filters = this.filter.apply();

    if (filters.has(SubscriptionFilter.ACTIVE_FILTER)) {
      const isActive = filters.get(SubscriptionFilter.ACTIVE_FILTER) as boolean;

      this.add({ where: { isActive } });
    }

    if (filters.has(SubscriptionFilter.CLIENT_ID_FILTER)) {
      const id = filters.get(SubscriptionFilter.CLIENT_ID_FILTER) as ID;

      this.add({ where: { userId: id } });
    }

    if (filters.has(SubscriptionFilter.ID_FILTER)) {
      const id = filters.get(SubscriptionFilter.ID_FILTER) as ID;

      this.add({ where: { id } });
    }

    if (filters.has(Pagination.PAGINATION_FILTER)) {
      const pagination = filters.get(Pagination.PAGINATION_FILTER);

      this.add(this.pagination(pagination))
    }

    if (filters.has(Order.ORDER_FILTER)) {
      const order = filters.get(Order.ORDER_FILTER).build();

      if (order.has(SubscriptionFilter.CREATION_DATE_FILTER)) {
        const direction = order.get(SubscriptionFilter.CREATION_DATE_FILTER);

        this.add({ order: { createdAt: direction } });
      }
    }

    this.add({ relations: { events: true } });

    return this.typeOrmFilter;
  }
}
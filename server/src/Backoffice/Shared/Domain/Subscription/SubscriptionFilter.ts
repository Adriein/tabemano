import { Filter } from "Shared/Domain/Entities/Filter";
import { Order } from "Shared/Domain/Entities/Order";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class SubscriptionFilter extends Filter {
  public static CREATION_DATE_FILTER = 'createdAt';
  public static ACTIVE_FILTER = 'isActive';
  public static CLIENT_ID_FILTER = 'clientId';

  public static builder(): SubscriptionFilter {
    return new SubscriptionFilter();
  };

  protected data: Map<string, any> = new Map();

  public isActive(isActive: boolean): this {
    this.data.set(SubscriptionFilter.ACTIVE_FILTER, isActive);
    return this;
  }

  public withClientId(id: ID): this {
    this.data.set(SubscriptionFilter.CLIENT_ID_FILTER, id);
    return this;
  }

  public orderByCreationDate(): Order {
    return this.orderBy(SubscriptionFilter.CREATION_DATE_FILTER);
  }

  public apply(): Map<string, any> {
    return this.data;
  }

}
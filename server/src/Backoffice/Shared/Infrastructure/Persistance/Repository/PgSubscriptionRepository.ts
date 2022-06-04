import { Result } from "@badrap/result";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";

export class PgSubscriptionRepository implements ISubscriptionRepository {
  delete(entity: Subscription): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: SubscriptionFilter): Promise<Result<Subscription[], Error>> {
    throw new Error();
  }

  public async findOne(filter: SubscriptionFilter): Promise<Result<Subscription, Error>> {
    throw new Error();
  }

  public async save(entity: Subscription): Promise<void> {
    throw new Error();
  }

  public async update(entity: Subscription): Promise<void> {
    throw new Error();
  }

}
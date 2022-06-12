import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource, EntitySchema } from "typeorm";

@Injectable()
export class PgSubscriptionRepository extends TypeOrmRepository<Subscription> implements ISubscriptionRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
  ) {
    super();
  }

  delete(entity: Subscription): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: SubscriptionFilter): Promise<Result<Subscription[], Error>> {
    throw new Error();
  }

  public async findOne(filter: SubscriptionFilter): Promise<Result<Subscription, RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Subscription): Promise<void> {
    throw new Error();
  }

  public async update(entity: Subscription): Promise<void> {
    throw new Error();
  }

  protected entitySchema(): EntitySchema<Subscription> {
    return SubscriptionModel;
  }

}
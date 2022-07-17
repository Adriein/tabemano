import { Result } from "@badrap/result";
import { Inject, Injectable } from "@nestjs/common";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { TypeOrmSubscriptionFilterAdapter } from "Backoffice/Shared/Infrastructure/Persistance/Filter/TypeOrmSubscriptionFilterAdapter";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Persistance/Mapper/PgSubscriptionMapper";
import { SubscriptionModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/SubscriptionModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

@Injectable()
export class PgSubscriptionRepository extends TypeOrmRepository<SubscriptionModel> implements ISubscriptionRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgSubscriptionMapper,
  ) {
    super();
  }

  delete(entity: Subscription): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: SubscriptionFilter): Promise<Result<Subscription[], Error>> {
    try {
      const adapter = new TypeOrmSubscriptionFilterAdapter(filter);

      const results = await this.repository().find(adapter.apply());

      return Result.ok(results.map((result: SubscriptionModel) => this.mapper.toDomain(result)));
    } catch (error) {
      return Result.err(error as Error);
    }
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

  protected entitySchema() {
    return SubscriptionModel;
  }

}
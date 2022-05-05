import { PrismaClient } from "@prisma/client";
import { ISubscriptionRepository } from "Backoffice/Shared/Domain/Subscription/ISubscriptionRepository";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { SubscriptionFilter } from "Backoffice/Shared/Domain/Subscription/SubscriptionFilter";
import { PrismaSubscriptionFilterAdapter } from "Backoffice/Shared/Infrastructure/Data/Filters/PrismaSubscriptionFilterAdapter";
import { PgSubscriptionMapper } from "Backoffice/Shared/Infrastructure/Data/Mappers/PgSubscriptionMapper";
import { Left } from "Shared/Domain/Entities/Left";
import { Right } from "Shared/Domain/Entities/Right";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgSubscriptionRepository implements ISubscriptionRepository {
  private database = Database.instance();
  private mapper = new PgSubscriptionMapper();

  delete(entity: Subscription): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: SubscriptionFilter): Promise<Either<Error, Subscription[]>> {
    throw new Error();
  }

  public async findOne(filter: SubscriptionFilter): Promise<Either<Error, Subscription>> {
    return await this.database.execute<Subscription>(async (connection: PrismaClient) => {
      const adapter = new PrismaSubscriptionFilterAdapter(filter);

      const [ result ]: any = await connection.ta_subscription.findMany(adapter.apply());

      if (!result) {
        return Left.error(new RecordNotFoundError());
      }

      return Right.success(this.mapper.toDomain(result))
    });
  }

  public async save(entity: Subscription): Promise<void> {
    await this.database.execute<void>(async (connection: PrismaClient) => {
      await connection.ta_subscription.create({ data: this.mapper.toSaveDataModel(entity) });

      return Right.success({});
    });
  }

  update(entity: Subscription): Promise<void> {
    return Promise.resolve(undefined);
  }

}
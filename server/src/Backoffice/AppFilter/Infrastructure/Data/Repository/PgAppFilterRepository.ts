import { PrismaClient } from "@prisma/client";
import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { AppFilterFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilterFilter";
import { IAppFilterRepository } from "Backoffice/AppFilter/Domain/Repository/IAppFilterRepository";
import { PrismaAppFilterAdapter } from "Backoffice/AppFilter/Infrastructure/Data/Filter/PrismaAppFilterAdapter";
import { AppFilterMapper } from "Backoffice/AppFilter/Infrastructure/Data/Mapper/AppFilterMapper";
import { Filter } from "Shared/Domain/Entities/Filter";
import { Right } from "Shared/Domain/Entities/Right";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class PgAppFilterRepository implements IAppFilterRepository {
  private database = Database.instance();
  private mapper = new AppFilterMapper();

  delete(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: AppFilterFilter): Promise<Either<Error, AppFilter[]>> {
    return await this.database.execute<AppFilter[]>(async (connection: PrismaClient) => {
      const adapter = new PrismaAppFilterAdapter(filter);

      const results = await connection.ta_app_filter.findMany(adapter.apply());

      return Right.success(this.mapper.toDomain(results));
    });
  }

  findOne(filter: Filter): Promise<Either<Error, AppFilter>> {
    throw new Error();
  }

  save(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

}
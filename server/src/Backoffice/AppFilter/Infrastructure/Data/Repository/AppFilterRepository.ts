import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { AppFilterFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilterFilter";
import { IAppFilterRepository } from "Backoffice/AppFilter/Domain/Repository/IAppFilterRepository";
import { AppFilterMapper } from "Backoffice/AppFilter/Infrastructure/Data/Mapper/AppFilterMapper";
import { Filter } from "Shared/Domain/Entities/Filter";
import { Either } from "Shared/Domain/types";
import Database from "Shared/Infrastructure/Data/Database";

export class AppFilterRepository implements IAppFilterRepository {
  private database = Database.instance();
  private mapper = new AppFilterMapper();

  delete(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: AppFilterFilter): Promise<Either<Error, AppFilter[]>> {
    throw new Error();
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
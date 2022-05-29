import { Result } from "@badrap/result";
import { AppFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilter";
import { AppFilterFilter } from "Backoffice/AppFilter/Domain/Entity/AppFilterFilter";
import { IAppFilterRepository } from "Backoffice/AppFilter/Domain/Repository/IAppFilterRepository";
import { Filter } from "Shared/Domain/Entities/Filter";

export class PgAppFilterRepository implements IAppFilterRepository {
  delete(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: AppFilterFilter): Promise<Result<AppFilter[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<AppFilter, Error>> {
    throw new Error();
  }

  save(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: AppFilter): Promise<void> {
    return Promise.resolve(undefined);
  }

}
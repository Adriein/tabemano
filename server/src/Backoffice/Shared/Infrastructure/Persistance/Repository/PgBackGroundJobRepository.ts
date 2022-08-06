import { Result } from "@badrap/result";
import { BackGroundJob } from "Cron/Shared/Domain/Entity/BackGroundJob";
import { IBackGroundJobRepository } from "Cron/Shared/Domain/Repository/IBackGroundJobRepository";


import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgBackGroundJobRepository implements IBackGroundJobRepository {
  delete(entity: BackGroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<BackGroundJob[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<BackGroundJob, RecordNotFoundError>> {
    throw new Error();
  }

  save(entity: BackGroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: BackGroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

}
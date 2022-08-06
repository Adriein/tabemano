import { Result } from "@badrap/result";
import { BackgroundJob } from "../../../../../Cron/Shared/Domain/Entity/BackGroundJob";
import { IBackgroundJobRepository } from "../../../../../Cron/Shared/Domain/Repository/IBackgroundJobRepository";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";

export class PgBackgroundJobRepository implements IBackgroundJobRepository {
  delete(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<BackgroundJob[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<BackgroundJob, RecordNotFoundError>> {
    throw new Error();
  }

  save(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

}
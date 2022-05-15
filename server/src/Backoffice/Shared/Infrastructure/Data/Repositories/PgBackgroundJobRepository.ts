import { BackgroundJob } from "Backoffice/Shared/Domain/BackgroundJob/BackgroundJob";
import { IBackgroundJobRepository } from "Backoffice/Shared/Domain/BackgroundJob/IBackgroundJobRepository";
import { Filter } from "Shared/Domain/Entities/Filter";
import { Either } from "Shared/Domain/types";

export class PgBackgroundJobRepository implements IBackgroundJobRepository {
  delete(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Either<Error, BackgroundJob[]>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Either<Error, BackgroundJob>> {
    throw new Error();
  }

  save(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

  update(entity: BackgroundJob): Promise<void> {
    return Promise.resolve(undefined);
  }

}
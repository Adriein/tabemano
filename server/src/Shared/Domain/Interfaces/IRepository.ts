import { Result } from "@badrap/result";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { Filter } from "../Entities/Filter";

export interface IRepository<T> {
  findOne(filter: Filter): Promise<Result<T, Error | RecordNotFoundError>>;

  find(filter: Filter): Promise<Result<T[], Error>>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}

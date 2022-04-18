import { ID } from "Shared/Domain/Vo/Id.vo";
import { Either } from "../types";
import { Filter } from "../Entities/Filter";

export interface IRepository<T> {
  findOne(id: ID): Promise<Either<Error, T>>;

  find(filter: Filter): Promise<Either<Error, T[]>>;

  save(entity: T): Promise<void>;

  update(entity: T): Promise<void>;

  delete(entity: T): Promise<void>;
}

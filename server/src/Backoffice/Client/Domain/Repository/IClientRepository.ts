import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { Filter } from "Shared/Domain/Entities/Filter";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";
import { Either } from "Shared/Domain/types";

export interface IClientRepository extends IRepository<Client> {
  count(): Promise<Either<Error, number>>;
}
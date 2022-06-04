import { Result } from "@badrap/result";
import { Client } from "Backoffice/Client/Domain/Entity/Client";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IClientRepository extends IRepository<Client> {
  count(): Promise<Result<number, Error>>;
}
import { Result } from "@badrap/result";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IClientRepository extends IRepository<Client> {
  count(): Promise<Result<number, Error>>;
}
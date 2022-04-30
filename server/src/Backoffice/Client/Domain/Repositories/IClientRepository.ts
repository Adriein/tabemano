import { Client } from "Backoffice/Client/Domain/Entities/Client";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IClientRepository extends IRepository<Client> {}
import { Client } from "Cron/Client/Domain/Entity/Client";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IClientRepository extends IRepository<Client> {}
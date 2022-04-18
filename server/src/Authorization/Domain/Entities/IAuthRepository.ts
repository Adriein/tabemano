import { Auth } from "Authorization/Domain/Entities/Auth";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IAuthRepository extends IRepository<Auth> {}
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ISubscriptionRepository extends IRepository<Subscription> {}
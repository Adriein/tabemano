import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IPricingRepository extends IRepository<Pricing> {}
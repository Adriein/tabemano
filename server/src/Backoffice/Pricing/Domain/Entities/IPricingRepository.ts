import { Pricing } from "Backoffice/Pricing/Domain/Entities/Pricing";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IPricingRepository extends IRepository<Pricing> {}
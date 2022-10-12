import { Result } from "@badrap/result";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IPricingRepository extends IRepository<Pricing> {
  findOne(filter: Filter): Promise<Result<Pricing, Error | RecordNotFoundError>>;

  find(filter: Filter): Promise<Result<Pricing[], Error>>;

  save(entity: Pricing): Promise<void>;

  update(entity: Pricing): Promise<void>;

  delete(entity: Pricing): Promise<void>;
}
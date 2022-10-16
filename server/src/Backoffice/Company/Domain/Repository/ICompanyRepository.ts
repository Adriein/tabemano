import { Result } from "@badrap/result";
import { Company } from "Backoffice/Company/Domain/Entity/Company";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ICompanyRepository extends IRepository<Company> {
  findOne(filter: Filter): Promise<Result<Company, Error | RecordNotFoundError>>;

  find(filter: Filter): Promise<Result<Company[], Error>>;

  save(entity: Company): Promise<void>;

  update(entity: Company): Promise<void>;

  delete(entity: Company): Promise<void>;
}
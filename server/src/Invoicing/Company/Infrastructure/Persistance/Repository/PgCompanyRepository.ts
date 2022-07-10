import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { Company } from "Invoicing/Company/Domain/Entity/Company";
import { ICompanyRepository } from "Invoicing/Company/Domain/Repository/ICompanyRepository";
import { CompanyModel } from "Invoicing/Company/Infrastructure/Persistance/Model/CompanyModel";
import { Filter } from "Shared/Domain/Entities/Filter";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgCompanyRepository extends TypeOrmRepository<CompanyModel> implements ICompanyRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<CompanyModel> {
    return CompanyModel;
  }

  delete(entity: Company): Promise<void> {
    return Promise.resolve(undefined);
  }

  find(filter: Filter): Promise<Result<Company[], Error>> {
    throw new Error();
  }

  findOne(filter: Filter): Promise<Result<Company, RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Company): Promise<void> {
    await this.repository().save({});
  }

  update(entity: Company): Promise<void> {
    return Promise.resolve(undefined);
  }

}
import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { ClassConstructor } from "class-transformer";
import { Company } from "Invoicing/Company/Domain/Entity/Company";
import { CompanyFilter } from "Invoicing/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Invoicing/Company/Domain/Repository/ICompanyRepository";
import { TypeOrmCompanyFilterAdapter } from "Invoicing/Company/Infrastructure/Persistance/Filter/TypeOrmCompanyFilterAdapter";
import { PgCompanyMapper } from "Invoicing/Company/Infrastructure/Persistance/Mapper/PgCompanyMapper";
import { CompanyModel } from "Invoicing/Company/Infrastructure/Persistance/Model/CompanyModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TypeOrmRepository } from "Shared/Infrastructure/Persistance/Repository/TypeOrmRepository";
import { DataSource } from "typeorm";

export class PgCompanyRepository extends TypeOrmRepository<CompanyModel> implements ICompanyRepository {
  constructor(
    @Inject(Database.DATABASE_CONNECTION)
    protected readonly dataSource: DataSource,
    private readonly mapper: PgCompanyMapper
  ) {
    super();
  }

  protected entitySchema(): ClassConstructor<CompanyModel> {
    return CompanyModel;
  }

  delete(entity: Company): Promise<void> {
    return Promise.resolve(undefined);
  }

  public async find(filter: CompanyFilter): Promise<Result<Company[], Error>> {
    try {
      const adapter = new TypeOrmCompanyFilterAdapter(filter);

      const results = await this.repository().find(adapter.apply());

      return Result.ok(results.map((result: CompanyModel) => this.mapper.toDomain(result)));
    } catch (error) {
      return Result.err(error as Error);
    }
  }

  findOne(filter: CompanyFilter): Promise<Result<Company, RecordNotFoundError>> {
    throw new Error();
  }

  public async save(entity: Company): Promise<void> {
    const model = this.mapper.toModel(entity);
    await this.repository().save(model);
  }

  update(entity: Company): Promise<void> {
    return Promise.resolve(undefined);
  }

}
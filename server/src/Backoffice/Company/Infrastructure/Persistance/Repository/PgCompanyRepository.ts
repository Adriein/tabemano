import { Result } from "@badrap/result";
import { Inject } from "@nestjs/common";
import { Company } from "Backoffice/Company/Domain/Entity/Company";
import { CompanyFilter } from "Backoffice/Company/Domain/Filter/CompanyFilter";
import { ICompanyRepository } from "Backoffice/Company/Domain/Repository/ICompanyRepository";
import { ClassConstructor } from "class-transformer";
import { TypeOrmCompanyFilterAdapter } from "Backoffice/Company/Infrastructure/Persistance/Filter/TypeOrmCompanyFilterAdapter";
import { PgCompanyMapper } from "Backoffice/Company/Infrastructure/Persistance/Mapper/PgCompanyMapper";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { RecordNotFoundError } from "Shared/Domain/Error/RecordNotFoundError";
import Database from "Shared/Infrastructure/Persistance/Database";
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";
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

  public async findOne(filter: CompanyFilter): Promise<Result<Company, RecordNotFoundError>> {
    const adapter = new TypeOrmCompanyFilterAdapter(filter);

    const result = await this.repository().findOne(adapter.apply());

    return result ? Result.ok(this.mapper.toDomain(result)) : Result.err(new RecordNotFoundError());
  }

  public async save(entity: Company): Promise<void> {
    const tenantCompanyRepository = await this.dataSource.getRepository(TenantCompanyModel);

    const model = this.mapper.toModel(entity);
    const tenantCompanyModel = this.associateTenantCompany(model, entity.tenantId());

    await this.repository().save(model);
    await tenantCompanyRepository.save(tenantCompanyModel);
  }

  update(entity: Company): Promise<void> {
    return Promise.resolve(undefined);
  }

  private associateTenantCompany(companyModel: CompanyModel, tenantId: ID): TenantCompanyModel {
    const model = new TenantCompanyModel();
    const tenantModel = new TenantModel();

    tenantModel.id = tenantId;

    model.id = ID.generate();
    model.companyId = companyModel.id;
    model.tenantId = tenantId;
    model.tenant = tenantModel;
    model.company = companyModel;
    model.createdAt = DateVo.now().value;
    model.updatedAt = DateVo.now().value;

    return model;
  }

}
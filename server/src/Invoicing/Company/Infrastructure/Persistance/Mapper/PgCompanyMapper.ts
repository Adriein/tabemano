import { Company } from "Invoicing/Company/Domain/Entity/Company";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgCompanyMapper implements IMapper<Company, CompanyModel> {
  public toDomain(dataModel: CompanyModel): Company {
    return new Company(
      dataModel.id,
      dataModel.name,
      dataModel.fiscalId,
      dataModel.address,
      dataModel.phone,
      dataModel.type,
      dataModel.country,
    );
  }

  public toModel(entity: Company): CompanyModel {
    const model = new CompanyModel();

    model.id = entity.id();
    model.name = entity.name();
    model.fiscalId = entity.fiscalId();
    model.address = entity.address();
    model.phone = entity.phone();
    model.type = entity.type();
    model.country = entity.country();
    
    return model;
  }

}
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class PgTenantCompanyMapper implements IMapper<Tenant, TenantCompanyModel> {
  public toDomain(dataModel: TenantCompanyModel): Tenant {
    throw new Error();
  }

  public toModel(entity: Tenant): TenantCompanyModel {
    const model = new TenantCompanyModel();
    const tenantModel = new TenantModel();
    const companyModel = new CompanyModel();

    tenantModel.id = entity.id();
    companyModel.id = entity.companyId()!;

    model.id = ID.generate();
    model.companyId = entity.companyId()!;
    model.tenantId = entity.id();
    model.createdAt = DateVo.now().value;
    model.updatedAt = DateVo.now().value;
    model.tenant = tenantModel;
    model.company = companyModel;

    return model;
  }

}
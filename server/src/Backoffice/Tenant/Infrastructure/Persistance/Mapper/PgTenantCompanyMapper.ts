import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { TenantCompanyModel } from "Shared/Infrastructure/Persistance/Model/TenantCompanyModel";

export class PgTenantCompanyMapper implements IMapper<Tenant, TenantCompanyModel> {
  public toDomain(dataModel: TenantCompanyModel): Tenant {
    throw new Error();
  }

  public toModel(entity: Tenant): TenantCompanyModel {
    const model = new TenantCompanyModel();

    model.id = ID.generate();
    model.companyId = entity.companyId()!;
    model.tenantId = entity.id();
    model.createdAt = DateVo.now().value;
    model.updatedAt = DateVo.now().value;

    return model;
  }

}
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class TenantMapper implements IMapper<Tenant, TenantModel> {
  public toDomain(dataModel: TenantModel): Tenant {
    return new Tenant(
      dataModel.id,
      dataModel.email,
      dataModel.name,
    );
  }

  public toModel(entity: Tenant): TenantModel {
    throw new Error('projection should not be saved here');
  }
}
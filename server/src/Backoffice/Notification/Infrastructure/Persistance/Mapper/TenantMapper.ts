import { Company } from "Backoffice/Notification/Domain/Entity/Company";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { Zip } from "Shared/Domain/Vo/Zip.vo";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class TenantMapper implements IMapper<Tenant, TenantModel> {
  public toDomain(dataModel: TenantModel): Tenant {
    const company = new Company(
      dataModel.company.id,
      dataModel.company.address,
      dataModel.company.country,
      dataModel.company.city,
      new Zip('aaaa'),
    );

    return new Tenant(
      dataModel.id,
      dataModel.email,
      dataModel.name,
      company
    );
  }

  public toModel(entity: Tenant): TenantModel {
    throw new Error('projection should not be saved here');
  }
}
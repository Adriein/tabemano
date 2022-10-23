import { Company } from "Backoffice/Notification/Domain/Entity/Company";
import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { Zip } from "Shared/Domain/Vo/Zip.vo";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class TenantMapper implements IMapper<Tenant, TenantModel> {
  public toDomain(dataModel: TenantModel): Tenant {
    const company = new Company(
      dataModel.companies[0].company.id,
      dataModel.companies[0].company.address,
      dataModel.companies[0].company.country,
      dataModel.companies[0].company.city,
      new Zip('aaaa'),
    );

    return new Tenant(
      dataModel.id,
      dataModel.notificationEmail!,
      dataModel.name,
      company
    );
  }

  public toModel(entity: Tenant): TenantModel {
    throw new Error('projection should not be saved here');
  }
}
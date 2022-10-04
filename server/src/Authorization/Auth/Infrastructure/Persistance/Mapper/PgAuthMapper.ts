import { Auth } from "Authorization/Auth/Domain/Entity/Auth";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class PgAuthMapper implements IMapper<Auth, TenantModel> {
  public toDomain(dataModel: TenantModel): Auth {
    return new Auth(
      dataModel.id,
      dataModel.name,
      dataModel.email,
      dataModel.password,
      dataModel.roleId
    );
  }

  public toModel(entity: Auth): TenantModel {
    throw new Error();
  }
}
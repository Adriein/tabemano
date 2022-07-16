import { Auth } from "Authorization/Domain/Entity/Auth";
import { Role } from "Authorization/Domain/Entity/Role";
import { AuthModel } from "Authorization/Infrastructure/Persistance/Model/AuthModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgAuthMapper implements IMapper<Auth, AuthModel> {
  public toDomain(dataModel: AuthModel): Auth {
    return new Auth(
      dataModel.id,
      dataModel.name,
      dataModel.email,
      dataModel.password,
      dataModel.roleId
    );
  }

  public toModel(entity: Auth): AuthModel {
    throw new Error();
  }
}
import { Auth } from "Authorization/Auth/Domain/Entity/Auth";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";

export class PgAuthMapper implements IMapper<Auth, UserModel> {
  public toDomain(dataModel: UserModel): Auth {
    return new Auth(
      dataModel.id,
      dataModel.name,
      dataModel.email,
      dataModel.password,
      dataModel.roleId
    );
  }

  public toModel(entity: Auth): UserModel {
    throw new Error();
  }
}
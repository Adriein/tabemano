import { Role } from "Authorization/Domain/Entity/Role";
import { AuthRoleModel } from "Authorization/Infrastructure/Persistance/Model/AuthRoleModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgRoleMapper implements IMapper<Role, AuthRoleModel> {
  public toDomain(dataModel: AuthRoleModel): Role {
    return new Role(
      dataModel.id,
      dataModel.type,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Role): AuthRoleModel {
    throw new Error();
  }
}
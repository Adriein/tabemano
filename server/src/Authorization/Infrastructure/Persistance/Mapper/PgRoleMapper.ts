import { Role } from "Authorization/Domain/Entity/Role";
import { RoleModel } from "Authorization/Infrastructure/Persistance/Model/RoleModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgRoleMapper implements IMapper<Role, RoleModel> {
  public toDomain(dataModel: RoleModel): Role {
    return new Role(
      dataModel.id,
      dataModel.type,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Role): RoleModel {
    throw new Error();
  }
}
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { UserModuleModel } from '../Model/UserModuleModel';

export class PgPermissionMapper implements IMapper<Permission, UserModuleModel> {
  public toDomain(dataModel: UserModuleModel): Permission {
    return new Permission(
      dataModel.id,
      dataModel.tenantId,
      dataModel.moduleId,
      dataModel.module.name,
      dataModel.module.path
    );
  }

  public toModel(entity: Permission): UserModuleModel {
    const model = new UserModuleModel();

    model.id = entity.id();
    model.tenantId = entity.tenantId();
    model.moduleId = entity.moduleId();
    model.module.name = entity.moduleName();
    model.module.path = entity.modulePath();

    return model;
  }
}
import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { UserModuleModel } from '../Model/UserModuleModel';

export class PgPermissionMapper implements IMapper<Permission, UserModuleModel> {
  public toDomain(dataModel: UserModuleModel): Permission {
    const url = dataModel.module.url.map(url => {
      return url;
    });
    
    return new Permission(
      dataModel.id,
      dataModel.tenantId,
      dataModel.moduleId,
      dataModel.module.name,
      url
    );
  }

  public toModel(entity: Permission): UserModuleModel {
    const model = new UserModuleModel();

    model.id = entity.id();
    model.tenantId = entity.tenantId();
    model.moduleId = entity.moduleId();
    model.module.name = entity.moduleName();
    model.module.url = entity.moduleUrl();

    return model;
  }
}

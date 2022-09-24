import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { PermissionModel } from '../Model/PermissionModel';

export class PgPermissionMapper implements IMapper<Permission, PermissionModel> {
  public toDomain(dataModel: PermissionModel): Permission {
    const urlList = dataModel.module.urlList.map(url => {
      return url.url;
    });

    return new Permission(
      dataModel.id,
      dataModel.tenantId,
      dataModel.moduleId,
      dataModel.module.name,
      urlList
    );
  }

  public toModel(entity: Permission): PermissionModel {
    const model = new PermissionModel();

    model.id = entity.id();
    model.tenantId = entity.tenantId();
    model.moduleId = entity.moduleId();
    model.module.name = entity.moduleName();
    // model.module.urlList = entity.moduleUrl();

    return model;
  }
}

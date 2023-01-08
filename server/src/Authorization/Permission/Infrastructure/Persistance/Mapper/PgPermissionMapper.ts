import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { PermissionModel } from 'Shared/Infrastructure/Persistance/Model/PermissionModel';
import { UrlProductModel } from 'Shared/Infrastructure/Persistance/Model/UrlProductModel';

export class PgPermissionMapper implements IMapper<Permission, PermissionModel> {
  public toDomain(dataModel: PermissionModel): Permission {
    const urlList = dataModel.module.urlList.map((url: UrlProductModel) => {
      return url.url;
    });

    return new Permission(
      dataModel.id,
      dataModel.tenantId,
      dataModel.productId,
      dataModel.module.name,
      urlList,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Permission): PermissionModel {
    const model = new PermissionModel();

    model.id = entity.id();
    model.tenantId = entity.tenantId();
    model.productId = entity.productId();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }
}

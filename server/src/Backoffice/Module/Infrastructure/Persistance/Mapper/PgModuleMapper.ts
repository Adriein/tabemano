import { Module } from 'Authorization/Permission/Domain/Entity/Module';
import { ModuleModel } from 'Shared/Infrastructure/Persistance/Model/ModuleModel';
import { UrlModel } from 'Authorization/Permission/Infrastructure/Persistance/Model/UrlModule';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { DateVo } from 'Shared/Domain/Vo/Date.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';

export class PgModuleMapper implements IMapper<Module, ModuleModel> {
  public toDomain(dataModel: ModuleModel): Module {
    const urlList = dataModel.urlList.map((url: UrlModel) => {
      return url.url;
    });
    return new Module(
      dataModel.id,
      dataModel.name,
      urlList,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Module): ModuleModel {
    const model = new ModuleModel();
    const urlModel = new UrlModel();

    const urlList = entity.urlList().map((url: Url) => {
      urlModel.url = url;
      urlModel.id = ID.generate();
      urlModel.moduleId = entity.id();
      urlModel.createdAt = DateVo.now().value;
      urlModel.updatedAt = DateVo.now().value;

      return urlModel;
    });

    model.id = entity.id();
    model.name = entity.name();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();
    model.urlList = urlList;

    return model;
  }
}

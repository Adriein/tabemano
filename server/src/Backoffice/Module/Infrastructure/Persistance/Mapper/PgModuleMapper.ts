import { ModuleModel } from 'Shared/Infrastructure/Persistance/Model/ModuleModel';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { DateVo } from 'Shared/Domain/Vo/Date.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Url } from 'Shared/Domain/Vo/Url.vo';
import { UrlModel } from 'Shared/Infrastructure/Persistance/Model/UrlModule';
import { Module } from 'Backoffice/Module/Domain/Entity/Module';

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
    const urlList = this.buildUrlModel(entity);

    model.id = entity.id();
    model.name = entity.name();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();
    model.urlList = urlList;

    return model;
  }

  private buildUrlModel(entity: Module): UrlModel[] {
    return entity.urlList().map((url: Url) => {
      const model = new UrlModel();

      model.url = url;
      model.id = ID.generate();
      model.moduleId = entity.id();
      model.createdAt = DateVo.now().value;
      model.updatedAt = DateVo.now().value;

      return model;
    });
  }
}

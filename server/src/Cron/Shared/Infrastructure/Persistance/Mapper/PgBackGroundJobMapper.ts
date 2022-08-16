import { BackGroundJob } from "Cron/Shared/Domain/Entity/BackGroundJob";
import { BackGroundJobModel } from "Cron/Shared/Infrastructure/Persistance/Model/BackGroundJobModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgBackGroundJobMapper implements IMapper<BackGroundJob, BackGroundJobModel> {
  public toDomain(dataModel: BackGroundJobModel): BackGroundJob {
    return new BackGroundJob(
      dataModel!.id,
      dataModel!.name,
      dataModel!.timeIni,
      dataModel!.timeEnd,
      dataModel!.createdAt,
      dataModel!.updatedAt,
    );
  }

  public toModel(entity: BackGroundJob): BackGroundJobModel {
    const model = new BackGroundJobModel();

    model.id = entity.id();
    model.name = entity.name();
    model.timeIni = entity.timeInit();
    model.timeEnd = entity.timeEnd();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }
}
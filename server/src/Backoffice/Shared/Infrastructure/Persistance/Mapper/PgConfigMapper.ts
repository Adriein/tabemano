import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { ConfigModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";

export class PgConfigMapper implements IMapper<Config, ConfigModel> {
  public toDomain(dataModel: ConfigModel): Config {
    return new Config(
      dataModel.id,
      dataModel.userId,
      dataModel.lang,
      dataModel.sendNotifications,
      dataModel.sendWarnings,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Config): ConfigModel {
    throw new Error();
  }

}
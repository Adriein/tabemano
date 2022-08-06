import { ClientModel } from "Backoffice/Client/Infrastructure/Persistance/Model/ClientModel";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { ConfigModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";


export class PgClientMapper implements IMapper<Client, ClientModel> {
  public toDomain(dataModel: ClientModel): Client {
    const config = new Config(
      dataModel.config.id,
      dataModel.config.userId,
      dataModel.config.lang,
      dataModel.config.sendNotifications,
      dataModel.config.sendWarnings,
      dataModel.config.createdAt,
      dataModel.config.updatedAt
    );

    return new Client(
      dataModel.id,
      dataModel.name,
      dataModel.password,
      dataModel.email,
      config,
      dataModel.tenantId,
      dataModel.roleId,
      dataModel.isActive,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Client): ClientModel {
    const model = new ClientModel();
    const modelConfig = new ConfigModel();

    model.id = entity.id();
    model.name = entity.name();
    model.password = entity.password();
    model.email = entity.email();
    model.tenantId = entity.tenantId();
    model.roleId = entity.roleId();
    model.isActive = entity.isActive();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    modelConfig.id = entity.configId();
    modelConfig.lang = entity.language();
    modelConfig.userId = entity.config().userId;
    modelConfig.sendWarnings = entity.canSendWarnings();
    modelConfig.sendNotifications = entity.canSendNotifications();
    modelConfig.createdAt = entity.createdAt();
    modelConfig.updatedAt = entity.updatedAt();
    
    model.config = modelConfig;

    return model;
  }
}
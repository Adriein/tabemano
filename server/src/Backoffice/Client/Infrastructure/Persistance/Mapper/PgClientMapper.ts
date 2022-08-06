import { ClientModel } from "Backoffice/Client/Infrastructure/Persistance/Model/ClientModel";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
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
    throw new Error();
  }
}
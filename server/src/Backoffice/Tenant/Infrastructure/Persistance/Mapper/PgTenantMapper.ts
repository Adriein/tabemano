import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { UserModel } from "Shared/Infrastructure/Persistance/Model/UserModel";

export class PgTenantMapper implements IMapper<Tenant, UserModel> {
  public toDomain(dataModel: UserModel): Tenant {
    const config = new Config(
      dataModel.config.id,
      dataModel.config.userId,
      dataModel.config.lang,
      dataModel.config.sendNotifications,
      dataModel.config.sendWarnings,
      dataModel.createdAt,
      dataModel.updatedAt
    );

    return new Tenant(
      dataModel.id,
      dataModel.name,
      dataModel.password,
      dataModel.email,
      config,
      dataModel.tenantId,
      dataModel.roleId,
      dataModel.isActive,
      PricingCollection.build(),
      AppConfig.build(),
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Tenant): UserModel {
    const model = new UserModel();

    model.id = entity.id();
    model.tenantId = entity.tenantId();
    model.name = entity.name();
    model.email = entity.email();
    model.password = entity.password();
    model.configId = entity.config().id;
    model.config = entity.config();
    model.roleId = entity.roleId();
    model.isActive = entity.isActive();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    return model;
  }

}
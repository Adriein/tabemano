import { PricingModel } from "Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { ConfigModel } from "Backoffice/Shared/Infrastructure/Persistance/Model/ConfigModel";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { Money } from "Shared/Domain/Entities/Money";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { RoleModel } from "Shared/Infrastructure/Persistance/Model/RoleModel";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class PgTenantMapper implements IMapper<Tenant, TenantModel> {
  public toDomain(dataModel: TenantModel): Tenant {
    const config = new Config(
      dataModel.config.id,
      dataModel.config.userId,
      dataModel.config.lang,
      dataModel.config.sendNotifications,
      dataModel.config.sendWarnings,
      dataModel.createdAt,
      dataModel.updatedAt
    );

    const pricingList = dataModel.pricing.map((pricing: PricingModel) => {
      return new Pricing(
        pricing.id,
        pricing.name,
        new Money(pricing.price, pricing.currency),
        pricing.duration,
        pricing.createdAt,
        pricing.updatedAt
      );
    });

    return new Tenant(
      dataModel.id,
      dataModel.name,
      dataModel.password,
      dataModel.email,
      config,
      dataModel.roleId,
      dataModel.isActive,
      PricingCollection.build(pricingList),
      AppConfig.build(),
      dataModel.companies[0]?.companyId ? dataModel.companies[0].companyId : null,
      dataModel.notificationEmail,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Tenant): TenantModel {
    const model = new TenantModel();
    const roleModel = new RoleModel();
    const configModel = new ConfigModel();

    roleModel.id = entity.roleId();
    configModel.id = entity.config().id;
    configModel.lang = entity.config().lang;
    configModel.sendWarnings = entity.config().sendWarnings;
    configModel.sendNotifications = entity.config().sendNotifications;
    configModel.userId = entity.config().userId;
    configModel.createdAt = entity.config().createdAt;
    configModel.updatedAt = entity.config().updatedAt;

    model.id = entity.id();
    model.name = entity.name();
    model.email = entity.email();
    model.password = entity.password();
    model.configId = entity.config().id;
    model.config = configModel;
    model.roleId = entity.roleId();
    model.role = roleModel;
    model.isActive = entity.isActive();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    if (entity.notificationEmail()) {
      model.notificationEmail = entity.notificationEmail();
    }

    return model;
  }

}
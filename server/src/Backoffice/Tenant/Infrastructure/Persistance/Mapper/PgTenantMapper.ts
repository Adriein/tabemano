import { PricingModel } from "Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { CompanyModel } from "Shared/Infrastructure/Persistance/Model/CompanyModel";
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
        pricing.price,
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
      dataModel.companyId,
      dataModel.notificationEmail,
      dataModel.createdAt,
      dataModel.updatedAt
    );
  }

  public toModel(entity: Tenant): TenantModel {
    const model = new TenantModel();
    const roleModel = new RoleModel();

    roleModel.id = entity.roleId();

    model.id = entity.id();
    model.name = entity.name();
    model.email = entity.email();
    model.password = entity.password();
    model.configId = entity.config().id;
    model.config = entity.config();
    model.roleId = entity.roleId();
    model.role = roleModel;
    model.isActive = entity.isActive();
    model.createdAt = entity.createdAt();
    model.updatedAt = entity.updatedAt();

    if (entity.companyId()) {
      const companyModel = new CompanyModel();
      companyModel.id = entity.companyId()!;
      model.companyId = entity.companyId()!;
      model.company = companyModel;
    }

    if (entity.notificationEmail()) {
      model.notificationEmail = entity.notificationEmail();
    }

    return model;
  }

}
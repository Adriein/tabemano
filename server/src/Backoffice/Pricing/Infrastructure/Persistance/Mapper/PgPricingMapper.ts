import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { PricingModel } from "Backoffice/Pricing/Infrastructure/Persistance/Model/PricingModel";
import { IMapper } from "Shared/Domain/Interfaces/IMapper";
import { TenantModel } from "Shared/Infrastructure/Persistance/Model/TenantModel";

export class PgPricingMapper implements IMapper<Pricing, PricingModel> {
  public toDomain(dataModel: PricingModel): Pricing {
    return new Pricing(
      dataModel.id,
      dataModel.name,
      dataModel.duration,
      dataModel.price,
      dataModel.tenantId,
    );
  }

  public toModel(entity: Pricing): PricingModel {
    const pricingModel = new PricingModel();
    const tenantModel = new TenantModel();

    tenantModel.id = entity.tenantId();

    pricingModel.id = entity.id();
    pricingModel.name = entity.name();
    pricingModel.duration = entity.duration();
    pricingModel.price = entity.price();
    pricingModel.tenantId = entity.tenantId();
    pricingModel.tenant = tenantModel;
    pricingModel.createdAt = entity.createdAt();
    pricingModel.updatedAt = entity.updatedAt();

    return pricingModel;
  }
}
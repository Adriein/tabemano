import { Prisma } from "@prisma/client";
import { Pricing } from "Backoffice/Pricing/Domain/Entity/Pricing";
import { ID } from "Shared/Domain/Vo/Id.vo";

const pricingModel = Prisma.validator<Prisma.ta_pricingFindManyArgs>()({});

type PricingModel = Prisma.ta_pricingGetPayload<typeof pricingModel>

export class PgTenantMapper {
  public toDomain(dataModel: PricingModel): Pricing {
    return new Pricing(
      new ID(dataModel.pr_id),
      dataModel.pr_name,
      dataModel.pr_duration,
      dataModel.pr_price,
      new ID(dataModel.pr_tenant_id!)
    )
  }
}
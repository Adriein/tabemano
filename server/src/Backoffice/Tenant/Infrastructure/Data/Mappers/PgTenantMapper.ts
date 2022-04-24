import { Prisma } from "@prisma/client";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { PricingVo } from "Backoffice/Shared/Domain/Vo/PricingVo";
import { PricingVoCollection } from "Backoffice/Shared/Domain/Vo/PricingVoCollection";
import { Tenant } from "Backoffice/Tenant/Domain/Entities/Tenant";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

const userWithRelations = Prisma.validator<Prisma.ta_userFindManyArgs>()({
  include: {
    us_config: true,
    us_app_config: true,
    us_role: true,
    us_subscriptions: true,
    us_pricing: true
  }
});

type UserWithRelations = Prisma.ta_userGetPayload<typeof userWithRelations>

export class PgTenantMapper {
  public toDomain(dataModel: UserWithRelations): Tenant {
    const config = new Config(
      new ID(dataModel.us_config!.co_id),
      dataModel.us_config!.co_language,
      dataModel.us_config!.co_send_notifications,
      dataModel.us_config!.co_send_warnings,
    );

    const pricingVoList = dataModel.us_pricing.map((pricingDataModel) => new PricingVo(
      new ID(pricingDataModel.pr_id),
      pricingDataModel.pr_name,
      pricingDataModel.pr_price,
      pricingDataModel.pr_duration,
    ));

    return new Tenant(
      new ID(dataModel.us_id),
      new Name(dataModel.us_name),
      new Password(dataModel.us_password),
      new Email(dataModel.us_email),
      config,
      new ID(dataModel.us_tenant_id),
      new ID(dataModel.us_role_id),
      dataModel.us_is_active,
      PricingVoCollection.build(pricingVoList),
      dataModel.us_created_at,
      dataModel.us_updated_at,
    );
  }
}
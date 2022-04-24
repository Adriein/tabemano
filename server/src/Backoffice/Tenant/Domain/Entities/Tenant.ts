import { User } from "Backoffice/Shared/Domain/User/User";
import { PricingVo } from "Backoffice/Shared/Domain/Vo/PricingVo";
import { PricingVoCollection } from "Backoffice/Shared/Domain/Vo/PricingVoCollection";
import { MONTHLY_PRICING, QUARTERLY_PRICING, YEARLY_PRICING } from "Backoffice/Tenant/Domain/constants";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export class Tenant extends User {
  public static build(name: Name, password: Password, email: Email, tenantId: ID, roleId: ID): Tenant {
    const config = Config.build(true, true);
    const pricingCollection = Tenant.buildBaseTenantPricing();

    return new Tenant(
      ID.generate(),
      name,
      password,
      email,
      config,
      tenantId,
      roleId,
      true,
      pricingCollection
    );
  }

  private static buildBaseTenantPricing(): PricingVoCollection {
    const quarterly = new PricingVo(ID.generate(), QUARTERLY_PRICING, 150, 90);
    const monthly = new PricingVo(ID.generate(), MONTHLY_PRICING, 50, 30);

    return PricingVoCollection.build([ monthly, quarterly ]);
  }

  constructor(
    _id: ID,
    protected _name: Name,
    protected _password: Password,
    protected _email: Email,
    protected _config: Config,
    protected _tenantId: ID,
    protected _roleId: ID,
    protected _active: boolean,
    protected _pricing: PricingVoCollection,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }

  public getYearlyPricingVo(): PricingVo {
    return this._pricing.getPricingByName(YEARLY_PRICING);
  }
}
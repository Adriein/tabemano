import { YEARLY_PRICING } from "Backoffice/Shared/constants";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { ClientCreatedDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientCreatedDomainEvent";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export class Tenant extends User {
  public static build(name: Name, password: Password, email: Email, tenantId: ID, roleId: ID): Tenant {
    const id = ID.generate();
    const config = Config.build(id, true, true);

    return new Tenant(
      id,
      name,
      password,
      email,
      config,
      tenantId,
      roleId,
      true,
      PricingCollection.build(),
      AppConfig.build()
    );
  }

  constructor(
    _id: ID,
    _name: Name,
    _password: Password,
    _email: Email,
    _config: Config,
    _tenantId: ID,
    _roleId: ID,
    _isActive: boolean,
    private _pricing: PricingCollection,
    private _appConfig: AppConfig,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _isActive, _createdAt, _updatedAt);
  }

  public getYearlyPricing(): Pricing {
    return this._pricing.getPricingByName(YEARLY_PRICING);
  }

  public registerClient(name: Name, email: Email, pricingId: ID, roleId: ID): void {
    const pricing = this._pricing.getPricingById(pricingId);
    const event = new ClientCreatedDomainEvent(this.id(), name, email, this.id(), pricing, roleId);

    this.publish(event);
  }
}
import { YEARLY_PRICING } from "Backoffice/Shared/constants";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { DefaultPricesCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/DefaultPricesCreatedDomainEvent";
import { ClientCreatedDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientCreatedDomainEvent";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { DomainEventsManager } from "Shared/Domain/Entities/DomainEventsManager";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export class Tenant extends User {
  public static build(name: Name, password: Password, email: Email, tenantId: ID, roleId: ID): Tenant {
    const config = Config.build(true, true);

    const tenant = new Tenant(
      ID.generate(),
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

    tenant.addEvent(new DefaultPricesCreatedDomainEvent(tenant.id()));
    return tenant;
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
    protected _pricing: PricingCollection,
    protected _appConfig: AppConfig,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }

  public getYearlyPricing(): Pricing {
    return this._pricing.getPricingByName(YEARLY_PRICING);
  }

  public registerClient(name: Name, email: Email, pricingId: ID, roleId: ID): void {
    const pricing = this._pricing.getPricingById(pricingId);
    const event = new ClientCreatedDomainEvent(this.id(), name, email, this.id(), pricing, roleId);

    this.addEvent(event);

    DomainEventsManager.publishEvents(this.id());
  }
}
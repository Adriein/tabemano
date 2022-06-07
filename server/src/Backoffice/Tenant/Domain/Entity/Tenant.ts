import { YEARLY_PRICING } from "Backoffice/Shared/constants";
import { User } from "Backoffice/Shared/Domain/User/User";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { DefaultPricesCreatedDomainEvent } from "Backoffice/Tenant/Application/CreateTenant/DefaultPricesCreatedDomainEvent";
import { ClientCreatedDomainEvent } from "Backoffice/Tenant/Application/RegisterClient/ClientCreatedDomainEvent";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
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

    tenant.publish(new DefaultPricesCreatedDomainEvent(tenant.id));
    return tenant;
  }

  constructor(
    readonly id: ID,
    readonly name: Name,
    readonly password: Password,
    readonly email: Email,
    readonly config: Config,
    readonly tenantId: ID,
    readonly roleId: ID,
    readonly isActive: boolean,
    readonly pricing: PricingCollection,
    readonly appConfig: AppConfig,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date(),
  ) {
    super(id, name, password, email, config, tenantId, roleId, isActive, createdAt, updatedAt);
  }

  public getYearlyPricing(): Pricing {
    return this.pricing.getPricingByName(YEARLY_PRICING);
  }

  public registerClient(name: Name, email: Email, pricingId: ID, roleId: ID): void {
    const pricing = this.pricing.getPricingById(pricingId);
    const event = new ClientCreatedDomainEvent(this.id, name, email, this.id, pricing, roleId);

    this.publish(event);
  }
}
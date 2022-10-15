import { YEARLY_PRICING } from "Backoffice/Shared/constants";
import { Client } from "Backoffice/Shared/Domain/Client/Client";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { PricingCollection } from "Backoffice/Shared/Domain/Pricing/PricingCollection";
import { AppConfig } from "Backoffice/Tenant/Domain/Entity/AppConfig";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export class Tenant extends AggregateRoot {
  public static build(name: Name, password: Password, email: Email, roleId: ID): Tenant {
    const id = ID.generate();
    const config = Config.build(id, true, true);

    return new Tenant(
      id,
      name,
      password,
      email,
      config,
      roleId,
      true,
      PricingCollection.build(),
      AppConfig.build()
    );
  }

  constructor(
    _id: ID,
    private readonly _name: Name,
    private readonly _password: Password,
    private _email: Email,
    private readonly _config: Config,
    private readonly _roleId: ID,
    private readonly _isActive: boolean,
    private _pricing: PricingCollection,
    private _appConfig: AppConfig,
    private _companyId: ID | null = null,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public name(): Name {
    return this._name;
  }

  public password(): Password {
    return this._password;
  }

  public email(): Email {
    return this._email;
  }

  public config(): Config {
    return this._config;
  }

  public roleId(): ID {
    return this._roleId;
  }

  public isActive(): boolean {
    return this._isActive;
  }

  public pricing(): PricingCollection {
    return this._pricing;
  }

  public appConfig(): AppConfig {
    return this._appConfig;
  }

  public companyId(): ID | null {
    return this._companyId;
  }

  public createSubscription(pricing: Pricing): Subscription {
    return Subscription.build(
      this.id(),
      DateVo.now(),
      pricing.id(),
      pricing.name(),
      pricing.duration(),
      pricing.price()
    );
  }

  public getYearlyPricing(): Pricing {
    return this._pricing.getPricingByName(YEARLY_PRICING);
  }

  public registerClient(name: Name, email: Email, pricingId: ID, roleId: ID): Client {
    return Client.build(name, email, this.id(), roleId);
  }

  public getAvailablePricing(): PricingCollection {
    return this._pricing;
  }

  public configureNotificationEmail(email: Email): void {
    this._email = email;
  }
}
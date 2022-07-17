import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export abstract class User extends AggregateRoot {
  protected constructor(
    _id: ID,
    private _name: Name,
    private _password: Password,
    private _email: Email,
    private _config: Config,
    private _tenantId: ID,
    private _roleId: ID,
    private _isActive: boolean,
    _createdAt: Date = new Date(),
    _updatedAt: Date = new Date()
  ) {
    super(_id, _createdAt, _updatedAt);
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

  public tenantId(): ID {
    return this._tenantId;
  }

  public roleId(): ID {
    return this._roleId;
  }

  public isActive(): boolean {
    return this._isActive;
  }
}
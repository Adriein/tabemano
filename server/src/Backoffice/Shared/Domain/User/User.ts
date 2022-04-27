import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export abstract class User extends AggregateRoot {
  protected constructor(
    _id: ID,
    protected _name: Name,
    protected _password: Password,
    protected _email: Email,
    protected _config: Config,
    protected _tenantId: ID,
    protected _roleId: ID,
    protected _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public name(): Name {
    return this._name;
  }

  public email(): Email {
    return this._email;
  }

  public password(): Password {
    return this._password;
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public isActive(): boolean {
    return this._active;
  }

  public configId = (): ID => {
    return this._config.id();
  }

  public language = (): string => {
    return this._config.lang();
  }

  public roleId = (): ID => {
    return this._roleId;
  }

  public sendNotifications = (): boolean => {
    return this._config.sendNotifications();
  }

  public sendWarnings = (): boolean => {
    return this._config.sendWarnings();
  }

  public createSubscription(pricing: Pricing): Subscription {
    return Subscription.build(this.id(), pricing.id(), DateVo.now(), pricing.duration(), pricing.price());
  }

  public changePersonalInfo(name: Name, email: Email): void {
    this._name = name;
    this._email = email;
    this.entityUpdated();
  }

  public changeConfig(warnings: boolean, notifications: boolean, language: string,): void {
    if (warnings) {
      this._config.activateWarnings();
    }

    if (!warnings) {
      this._config.deactivateWarnings();
    }

    if (notifications) {
      this._config.activateNotifications();
    }

    if (!notifications) {
      this._config.deactivateNotifications();
    }

    this._config.changeLanguage(language);
    this.entityUpdated();
  }
}
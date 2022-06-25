import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { Aggregate } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";


export abstract class User extends Aggregate {
  protected constructor(
    readonly id: ID,
    readonly name: Name,
    readonly password: Password,
    readonly email: Email,
    readonly config: Config,
    readonly tenantId: ID,
    readonly roleId: ID,
    readonly isActive: boolean,
    readonly createdAt: Date = new Date(),
    readonly updatedAt: Date = new Date()
  ) {
    super(id, createdAt, updatedAt);
  }

  public configId = (): ID => {
    return this.config.id;
  }

  public language = (): string => {
    return this.config.lang;
  }

  public sendNotifications = (): boolean => {
    return this.config.sendNotifications;
  }

  public sendWarnings = (): boolean => {
    return this.config.sendWarnings;
  }

  public createSubscription(pricing: Pricing): Subscription {
    return Subscription.build(this.id, DateVo.now(), pricing.name(), pricing.duration(), pricing.price());
  }
}
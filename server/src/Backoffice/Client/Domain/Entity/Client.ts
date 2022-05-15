import { Config } from "Backoffice/Shared/Domain/Config/Config";
import { Pricing } from "Backoffice/Shared/Domain/Pricing/Pricing";
import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { User } from "Backoffice/Shared/Domain/User/User";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";
import { Password } from "Shared/Domain/Vo/Password.vo";

export class Client extends User {
  public static build(
    name: Name,
    email: Email,
    tenantId: ID,
    roleId: ID,
  ): Client {
    return new Client(ID.generate(), name, Password.generate(), email, Config.build(), tenantId, roleId, true);
  }

  constructor(
    _id: ID,
    _name: Name,
    _password: Password,
    _email: Email,
    _config: Config,
    _tenantId: ID,
    _roleId: ID,
    _active: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _name, _password, _email, _config, _tenantId, _roleId, _active, _createdAt, _updatedAt);
  }

  public moneySpent(subscriptions: Subscription[]): number {
    return subscriptions.reduce((total, subscription: Subscription) => {
      return total + subscription.price();
    }, 0);
  }

  public monthlyRecurringRevenue(subscriptions: Subscription[]): number {
    const spent = this.moneySpent(subscriptions);

    return spent > 0 && subscriptions.length > 1 ? spent / subscriptions.length : spent;
  }

  public createSubscription(pricing: Pricing): Subscription {
    return Subscription.build(this.id(), DateVo.now(), pricing);
  }
}
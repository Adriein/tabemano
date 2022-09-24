import { Config } from "Cron/Client/Domain/Entity/Config";
import { Subscription } from "Cron/Client/Domain/Entity/Subscription";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Client extends AggregateRoot {

  constructor(
    _id: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _config: Config,
    private readonly _activeSubscription: Subscription,
    private readonly _tenantWarningDays: number,
    private readonly _isActive: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public activeSubscription(): Subscription {
    return this._activeSubscription;
  }

  public activeSubscriptionId(): ID {
    return this._activeSubscription.id();
  }

  public canSendWarnings(): boolean {
    return this._config.sendWarnings;
  }

  public canSendNotifications(): boolean {
    return this._config.sendNotifications;
  }

  public tenantWarningDays(): number {
    return this._tenantWarningDays;
  }

  public isActiveSubscriptionExpired(): boolean {
    return this._activeSubscription.checkIsExpired();
  }
}
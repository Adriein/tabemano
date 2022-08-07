import { Config } from "Cron/Client/Domain/Entity/Config";
import { Subscription } from "Cron/Client/Domain/Entity/Subscription";
import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Client {

  constructor(
    private readonly _id: ID,
    private readonly _name: Name,
    private readonly _email: Email,
    private readonly _config: Config,
    private readonly _activeSubscription: Subscription,
    private readonly _tenantWarningDays: number,
    private readonly _isActive: boolean,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date
  ) {}

  public activeSubscription(): Subscription {
    return this._activeSubscription;
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
}
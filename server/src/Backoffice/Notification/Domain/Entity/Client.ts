import { Subscription } from "Backoffice/Shared/Domain/Subscription/Subscription";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Client {
  constructor(
    private readonly _id: ID,
    private readonly _name: Name,
    private readonly _tenantName: Name,
    private readonly _activeSubscription: Subscription,
  ) {}


  public id(): ID {
    return this._id;
  }

  public name(): Name {
    return this._name;
  }

  public tenantName(): Name {
    return this._tenantName;
  }

  public activeSubscription(): Subscription {
    return this._activeSubscription;
  }
}
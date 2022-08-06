import { CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB } from "Backoffice/Shared/constants";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class BackGroundJob extends AggregateRoot {
  private _timeInit: DateVo | undefined;
  private _timeEnd: DateVo | undefined;

  public static expiredSubscription(): BackGroundJob {
    return new BackGroundJob(ID.generate(), CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB, new Date(), new Date());
  }

  constructor(
    _id: ID,
    private _name: string,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public init(): void {
    this._timeInit = DateVo.now();
  }

  public end(): void {
    this._timeEnd = DateVo.now();
  }
}
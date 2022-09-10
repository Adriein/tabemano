import {
  CHECK_ABOUT_TO_EXPIRE_SUBSCRIPTION_JOB,
  CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB
} from "Backoffice/Shared/constants";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class BackGroundJob extends AggregateRoot {
  public static expiredSubscription(): BackGroundJob {
    return new BackGroundJob(
      ID.generate(),
      CHECK_FOR_EXPIRED_CLIENT_SUBSCRIPTION_JOB,
      DateVo.now(),
      DateVo.now(),
      new Date(),
      new Date()
    );
  }

  public static aboutToExpireSubscription(): BackGroundJob {
    return new BackGroundJob(
      ID.generate(),
      CHECK_ABOUT_TO_EXPIRE_SUBSCRIPTION_JOB,
      DateVo.now(),
      DateVo.now(),
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _name: string,
    private _timeInit: DateVo,
    private _timeEnd: DateVo,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }


  public name(): string {
    return this._name;
  }

  public timeInit(): DateVo {
    return this._timeInit;
  }

  public timeEnd(): DateVo {
    return this._timeEnd;
  }

  public init(): void {
    this._timeInit = DateVo.now();
  }

  public end(): void {
    this._timeEnd = DateVo.now();
  }
}
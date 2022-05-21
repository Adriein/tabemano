import { BaseEntity } from "Shared/Domain/Entities/BaseEntity";
import { DateVo } from "Shared/Domain/Vo/Date.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class AppConfig extends BaseEntity {
  public static build(): AppConfig {
    return new AppConfig(
      ID.generate(),
      5,
      5,
      '',
      DateVo.now(),
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    _warningDelay: number,
    _notificationDelay: number,
    _emailContent: string,
    _lastSentReport: DateVo,
    _createdAt: Date,
    _updatedAt: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }
}
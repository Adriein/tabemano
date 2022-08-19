import { IQuery } from '@nestjs/cqrs';

export class CheckPermissionQuery implements IQuery {
  constructor(private readonly _tenantId: string, private readonly _moduleId: string) {}

  public static fromJson(json: any): CheckPermissionQuery {
    return new CheckPermissionQuery(json.tenantId, json.moduleId);
  }

  get tenantId(): string {
    return this._tenantId;
  }

  get moduleId(): string {
    return this._moduleId;
  }
}

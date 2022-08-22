import { IQuery } from '@nestjs/cqrs';

export class GetPermissionQuery implements IQuery {
  constructor(private readonly _tenantId: string) {}

  public static fromJson(json: any): GetPermissionQuery {
    return new GetPermissionQuery(json.tenantId);
  }

  get tenantId(): string {
    return this._tenantId;
  }
}

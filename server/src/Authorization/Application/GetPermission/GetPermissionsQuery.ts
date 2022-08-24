import { IQuery } from '@nestjs/cqrs';

export class GetPermissionsQuery implements IQuery {
  constructor(private readonly _tenantId: string) {}

  public static fromJson(json: any): GetPermissionsQuery {
    return new GetPermissionsQuery(json.tenantId);
  }

  get tenantId(): string {
    return this._tenantId;
  }
}

import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';

export class GetPermissionsResponse {
  public static fromDomain(permission: Permission): GetPermissionsResponse {
    return new GetPermissionsResponse(
      permission.id().value,
      permission.tenantId().value,
      permission.moduleId().value,
      permission.moduleName().value
    );
  }

  constructor(
    readonly id: string,
    readonly tenantId: string,
    readonly moduleId: string,
    readonly moduleName: string
  ) {}
}

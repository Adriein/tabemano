import { Permission } from 'Authorization/Domain/Entity/Permission';

export class CheckPermissionResponse {
  public static fromDomain(permission: Permission): CheckPermissionResponse {
    return new CheckPermissionResponse(
      permission.id().value,
      permission.tenantId().value,
      permission.moduleId().value
    );
  }

  constructor(readonly id: string, readonly tenantId: string, readonly moduleId: string) {}
}

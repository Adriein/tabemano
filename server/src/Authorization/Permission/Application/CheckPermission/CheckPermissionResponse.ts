import { Permission } from 'Authorization/Permission/Domain/Entity/Permission';

export class CheckPermissionResponse {
  public static fromDomain(permission: Permission): CheckPermissionResponse {
    return new CheckPermissionResponse(
      permission.id().value,
      permission.tenantId().value,
      permission.productId().value,
      permission.productName().value
    );
  }

  constructor(
    readonly id: string,
    readonly tenantId: string,
    readonly moduleId: string,
    readonly moduleName: string
  ) {}
}

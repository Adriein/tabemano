import { Permission } from "Authorization/Domain/Entity/Permission";

export class GetPermissionResponse {
    public static fromDomain(permission: Permission): GetPermissionResponse {
        return new GetPermissionResponse(
          permission.id().value,
          permission.tenantId().value,
          permission.moduleId().value
        );
      }
    
      constructor(readonly id: string, readonly tenantId: string, readonly moduleId: string) {}
}
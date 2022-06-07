import { Role } from "Backoffice/Role/Domain/Entity/Role";

export class FindRoleResponse {
  public static fromDomain(role: Role): FindRoleResponse {
    return new FindRoleResponse(role.type.value, role.id.value)
  }

  constructor(readonly type: string, readonly id: string) {}
}
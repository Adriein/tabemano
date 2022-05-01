import { Role } from "Backoffice/Role/Domain/Entities/Role";

export class FindRoleResponse {
  public static fromDomain(role: Role): FindRoleResponse {
    return new FindRoleResponse(role.type().value, role.id().value)
  }

  constructor(private _type: string, private _id: string) {}
  
  public get type(): string {
    return this._type;
  }

  public get id(): string {
    return this._id;
  }

  public serialize() {
    return {
      id: this._id,
      type: this._type
    }
  }
}
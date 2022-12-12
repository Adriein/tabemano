import { ADMIN_ROLE, CLIENT_ROLE, Roles, TENANT_ROLE } from "Shared/Domain/constants";
import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { z } from "zod";

export class RoleType extends ValueObject {
  public static client(): RoleType {
    return new RoleType(CLIENT_ROLE);
  }

  public static tenant(): RoleType {
    return new RoleType(TENANT_ROLE);
  }

  public static admin(): RoleType {
    return new RoleType(ADMIN_ROLE);
  }

  constructor(private readonly _value: string) {
    super();
    this.validate();
  }

  protected validate(): boolean {
    const roles = z.nativeEnum(Roles);
    try {
      roles.parse(this._value);

      return true;
    } catch (error) {
      throw new Error();
    }
  }

  get value(): string {
    return this._value;
  }

}
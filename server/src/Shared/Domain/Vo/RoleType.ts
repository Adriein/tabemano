import { Roles } from "Authorization/Domain/constants";
import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { z } from "zod";

export class RoleType extends ValueObject {
  constructor(private readonly _value: string) {
    super();
    this.validate(_value);
  }

  protected validate(primitive: any): boolean {
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
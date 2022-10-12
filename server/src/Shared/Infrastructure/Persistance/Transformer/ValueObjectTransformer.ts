import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { Primitives, ValueObjectConstructor } from "Shared/Infrastructure/Types";
import { ValueTransformer } from "typeorm";

export class ValueObjectTransformer<DatabaseType extends Primitives, VO extends ValueObject> implements ValueTransformer {
  constructor(private readonly valueObject: ValueObjectConstructor<VO>, private readonly nullable = false) {}

  public from(value: DatabaseType): VO | null {
    if (this.nullable) {
      return null;
    }

    return new this.valueObject(value);
  }

  public to(value: VO): DatabaseType {
    return value?.value as DatabaseType;
  }
}
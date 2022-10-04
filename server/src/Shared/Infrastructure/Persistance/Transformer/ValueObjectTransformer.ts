import { ValueObject } from "Shared/Domain/Vo/ValueObject";
import { Primitives, ValueObjectConstructor } from "Shared/Infrastructure/Types";
import { ValueTransformer } from "typeorm";

export class ValueObjectTransformer<DatabaseType extends Primitives, VO extends ValueObject> implements ValueTransformer {
  constructor(private readonly valueObject: ValueObjectConstructor<VO>) {}

  public from(value: DatabaseType): VO {
    return new this.valueObject(value);
  }

  public to(value: VO): DatabaseType {
    console.log(JSON.stringify(value));
    return value?.value as DatabaseType;
  }
}
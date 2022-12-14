import { ID } from 'Shared/Domain/Vo/Id.vo';
import { MacronutrientName } from 'Shared/Domain/Vo/MacronutrientName.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';

export class Macronutrient {
  public static build(name: MacronutrientName, quantity: Number, unit: Unit): Macronutrient {
    return new Macronutrient(ID.generate(), name, quantity, unit, new Date(), new Date());
  }

  constructor(
    _id: ID,
    private _name: MacronutrientName,
    private _quantity: Number,
    private _unit: Unit,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public name(): MacronutrientName {
    return this._name;
  }

  public quantity(): Number {
    return this._quantity;
  }

  public unit(): Unit {
    return this._unit;
  }
}

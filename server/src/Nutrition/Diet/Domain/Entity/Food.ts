import { Allergen } from 'Shared/Domain/Vo/Allergen.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Kcal } from 'Shared/Domain/Vo/Kcal.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Unit } from 'Shared/Domain/Vo/Unit.vo';
import { Macronutrient } from './Macronutrient';

export class Food {
  public static build(
    name: Name,
    calories: Kcal,
    quantity: number,
    unit: Unit,
    macronutrients: Macronutrient[],
    allergens: Allergen[]
  ): Food {
    return new Food(
      ID.generate(),
      name,
      calories,
      quantity,
      unit,
      macronutrients,
      allergens,
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _name: Name,
    private _calories: Kcal,
    private _quantity: number,
    private _unit: Unit,
    private _macronutrients: Macronutrient[],
    private _allergens: Allergen[],
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public name(): Name {
    return this._name;
  }

  public calories(): Kcal {
    return this._calories;
  }

  public quantity(): number {
    return this._quantity;
  }

  public unit(): Unit {
    return this._unit;
  }

  public macronutrients(): Macronutrient[] {
    return this._macronutrients;
  }

  public allergens(): Allergen[] {
    return this._allergens;
  }

  public totalFoodCalories(): Kcal {
    return new Kcal((this._quantity * this._calories.value) / 100);
  }
}

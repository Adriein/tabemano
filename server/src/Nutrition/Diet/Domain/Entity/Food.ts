import { Allergen } from 'Shared/Domain/Vo/Allergen.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Kcal } from 'Shared/Domain/Vo/Kcal.vo';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { Macronutrient } from './Macronutrient';

export class Food {
  public static build(
    name: Name,
    calories: Kcal,
    quantity: Number,
    macronutrient: Macronutrient,
    allergen: Allergen
  ): Food {
    return new Food(
      ID.generate(),
      name,
      calories,
      quantity,
      macronutrient,
      allergen,
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _name: Name,
    private _calories: Kcal,
    private _quantity: Number,
    private _macronutrient: Macronutrient,
    private _allergen: Allergen,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public name(): Name {
    return this._name;
  }

  public calories(): Kcal {
    return this._calories;
  }

  public quantity(): Number {
    return this._quantity;
  }

  public macronutrient(): Macronutrient {
    return this._macronutrient;
  }

  public allergen(): Allergen {
    return this._allergen;
  }
}

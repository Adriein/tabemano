import { ID } from 'Shared/Domain/Vo/Id.vo';

export class Macronutrient {
  public static build(carbohydrates: Number, proteins: Number, fats: Number): Macronutrient {
    return new Macronutrient(ID.generate(), carbohydrates, proteins, fats, new Date(), new Date());
  }

  constructor(
    _id: ID,
    private _carbohydrates: Number,
    private _proteins: Number,
    private _fats: Number,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public carbohydrates(): Number {
    return this._carbohydrates;
  }

  public proteins(): Number {
    return this._proteins;
  }

  public fats(): Number {
    return this._fats;
  }
}

import { Annotation } from 'Shared/Domain/Vo/Annotation.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Kcal } from 'Shared/Domain/Vo/Kcal.vo';
import { Title } from 'Shared/Domain/Vo/Title.vo';
import { Food } from './Food';

export class Meal {
  public static build(
    title: Title,
    foodList: Food[],
    annotation: Annotation,
    totalCalories: Kcal,
    trainingDay: boolean
  ): Meal {
    return new Meal(
      ID.generate(),
      title,
      foodList,
      annotation,
      totalCalories,
      trainingDay,
      new Date(),
      new Date()
    );
  }
  constructor(
    _id: ID,
    private _title: Title,
    private _foodList: Food[],
    private _annotation: Annotation,
    private _totalCalories: Kcal,
    private _trainingDay: boolean,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {}

  public title(): Title {
    return this._title;
  }

  public foodList(): Food[] {
    return this._foodList;
  }

  public annotation(): Annotation {
    return this._annotation;
  }

  public trainingDay(): boolean {
    return this._trainingDay;
  }

  public totalMealCalories(): Kcal {
    this._foodList.forEach((food: Food) => {
      this._totalCalories = new Kcal(this._totalCalories.value + food.totalFoodCalories().value);
    });

    return this._totalCalories;
  }
}

import { AggregateRoot } from '@nestjs/cqrs';
import { Annotation } from 'Shared/Domain/Vo/Annotation.vo';
import { DietType } from 'Shared/Domain/Vo/DietType.vo';
import { ID } from 'Shared/Domain/Vo/Id.vo';
import { Kcal } from 'Shared/Domain/Vo/Kcal.vo';
import { Title } from 'Shared/Domain/Vo/Title.vo';
import { Meal } from './Meal';

export class Diet extends AggregateRoot {
  public static build(
    title: Title,
    tenantId: ID,
    clientId: ID,
    meals: Meal[],
    annotation: Annotation,
    totalCalories: Kcal,
    type: DietType[]
  ): Diet {
    return new Diet(
      ID.generate(),
      title,
      tenantId,
      clientId,
      meals,
      annotation,
      totalCalories,
      type,
      new Date(),
      new Date()
    );
  }

  constructor(
    _id: ID,
    private _title: Title,
    private _tenantId: ID,
    private _clientId: ID,
    private _meals: Meal[],
    private _annotation: Annotation,
    private _totalCalories: Kcal,
    private _type: DietType[],
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super();
  }

  public title(): Title {
    return this._title;
  }

  public tenantId(): ID {
    return this._tenantId;
  }

  public clientId(): ID {
    return this._clientId;
  }

  public meals(): Meal[] {
    return this._meals;
  }

  public annotation(): Annotation {
    return this._annotation;
  }

  public type(): DietType[] {
    return this._type;
  }

  private calculateTotalCalories(): Kcal {
    return this._totalCalories;
  }
}

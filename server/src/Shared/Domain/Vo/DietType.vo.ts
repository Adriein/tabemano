import { z } from 'zod';
import { Diets } from '../constants';
import { ValueObject } from './ValueObject';

export class DietType extends ValueObject {
  public static Carnivore(): DietType {
    return new DietType(Diets.CARNIVORE);
  }
  public static Omnivorous(): DietType {
    return new DietType(Diets.OMNIVOROUS);
  }
  public static Vegan(): DietType {
    return new DietType(Diets.VEGAN);
  }
  public static Vegetarian(): DietType {
    return new DietType(Diets.VEGETARIAN);
  }
  public static Pregnant(): DietType {
    return new DietType(Diets.PREGNANT);
  }

  constructor(private readonly _value: string) {
    super();

    this.validate();
  }

  protected validate(): boolean {
    const diets = z.nativeEnum(Diets);
    try {
      diets.parse(this._value);

      return true;
    } catch (error) {
      throw new Error();
    }
  }

  get value(): string {
    return this._value;
  }
}

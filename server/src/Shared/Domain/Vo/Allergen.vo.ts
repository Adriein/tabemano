import { z } from 'zod';
import { ValueObject } from './ValueObject';
import { Allergens } from 'Shared/Domain/constants';

export class Allergen extends ValueObject {
  public static Mollusc(): Allergen {
    return new Allergen(Allergens.MOLLUSC);
  }

  public static Crustacean(): Allergen {
    return new Allergen(Allergens.CRUSTACEAN);
  }

  public static Fish(): Allergen {
    return new Allergen(Allergens.FISH);
  }

  public static Egg(): Allergen {
    return new Allergen(Allergens.EGG);
  }

  public static Milk(): Allergen {
    return new Allergen(Allergens.MILK);
  }

  public static Peanut(): Allergen {
    return new Allergen(Allergens.PEANUT);
  }

  public static Soy(): Allergen {
    return new Allergen(Allergens.SOY);
  }

  public static TreeNut(): Allergen {
    return new Allergen(Allergens.TREE_NUT);
  }

  public static Cereal(): Allergen {
    return new Allergen(Allergens.CEREAL);
  }

  public static Sesame(): Allergen {
    return new Allergen(Allergens.SESAME);
  }

  public static Mustard(): Allergen {
    return new Allergen(Allergens.MUSTARD);
  }

  public static Celery(): Allergen {
    return new Allergen(Allergens.CELERY);
  }

  public static Lupin(): Allergen {
    return new Allergen(Allergens.LUPIN);
  }

  public static Sulphite(): Allergen {
    return new Allergen(Allergens.SULPHITE);
  }

  constructor(private readonly _value: string) {
    super();

    this.validate(_value);
  }

  protected validate(primitive: any): boolean {
    const allergens = z.nativeEnum(Allergens);
    try {
      allergens.parse(this._value);

      return true;
    } catch (error) {
      throw new Error();
    }
  }

  get value(): string {
    return this._value;
  }
}

import { z } from 'zod';
import { MacronutrientNames } from '../constants';
import { StringVo } from './String.vo';

export class MacronutrientName extends StringVo {
  public static Carbohydrates(): MacronutrientName {
    return new MacronutrientName(MacronutrientNames.CARBOHYDRATES);
  }

  public static Proteins(): MacronutrientName {
    return new MacronutrientName(MacronutrientNames.PROTEINS);
  }

  public static Fat(): MacronutrientName {
    return new MacronutrientName(MacronutrientNames.FAT);
  }

  constructor(private name: string) {
    super(name);
  }

  protected validate(): boolean {
    const macronutrientNames = z.nativeEnum(MacronutrientNames);
    try {
      macronutrientNames.parse(this.name);

      return true;
    } catch (error) {
      throw new Error();
    }
  }

  get value(): string {
    return this.name;
  }
}

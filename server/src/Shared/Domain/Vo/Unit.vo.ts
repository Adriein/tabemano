import { z } from 'zod';
import { Units } from '../constants';
import { StringVo } from './String.vo';

export class Unit extends StringVo {
  public static Grams(): Unit {
    return new Unit(Units.GRAMS);
  }

  constructor(private unit: string) {
    super(unit);
  }

  protected validate(): boolean {
    const units = z.nativeEnum(Units);
    try {
      units.parse(this.unit);

      return true;
    } catch (error) {
      throw new Error();
    }
  }

  get value(): string {
    return this.unit;
  }
}

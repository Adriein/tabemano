import { NumberVo } from './Number.vo';

export class Kcal extends NumberVo {
  constructor(value: number) {
    super(value);

    this.validate();
  }

  protected validate(): boolean {
    if (this.value < 0) {
      throw new Error(`Calories can't be lower than 0`);
    }

    return true;
  }

  get value(): number {
    return this.value;
  }
}

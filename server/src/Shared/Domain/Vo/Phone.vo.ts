import { NumberVo } from "Shared/Domain/Vo/Number.vo";

export class Phone extends NumberVo {
  constructor(_value: number) {
    super(_value);
  }
}
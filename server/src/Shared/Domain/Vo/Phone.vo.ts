import { NumberVo } from "Shared/Domain/Vo/Number.vo";
import { StringVo } from "Shared/Domain/Vo/String.vo";

export class Phone extends StringVo {
  constructor(_value: string) {
    super(_value);
  }
}
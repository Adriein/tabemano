import { StringVo } from "Shared/Domain/Vo/String.vo";

export class Currency extends StringVo {
  constructor(_value: string) {
    super(_value);
  }
}
import { Left } from "./Left";

export class Right<L, R> {
  readonly value: R;

  constructor(value: R) {
    this.value = value;
  }

  isError(): this is Left<L, R> {
    return false;
  }

  isOk(): this is Right<L, R> {
    return true;
  }

  public static success(data: any): Right<Error, any> {
    return new Right(data);
  }
}
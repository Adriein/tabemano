import { Right } from "./Right";

export class Left<L, R> {
  readonly value: L;

  constructor(value: L) {
    this.value = value;
  }

  isError(): this is Left<L, R> {
    return true;
  }

  isOk(): this is Right<L, R> {
    return false;
  }

  public static error(error: Error): Left<Error, any> {
    return new Left(error);
  }
}
import { merge } from "merge-anything";

export abstract class PrismaAdapter<T> {
  protected readonly prismaFilter = {};

  protected merge(filter: T): void {
    merge(this.prismaFilter, filter);
  }

  protected pagination(page: number, quantity: number) {
    return {
      take: quantity,
      skip: (page - 1) * quantity
    };
  }
}
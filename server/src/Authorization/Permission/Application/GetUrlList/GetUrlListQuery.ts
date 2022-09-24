import { IQuery } from '@nestjs/cqrs';

export class GetUrlListQuery implements IQuery {
  constructor(private readonly _name: string) {}

  get name(): string {
    return this._name;
  }
}

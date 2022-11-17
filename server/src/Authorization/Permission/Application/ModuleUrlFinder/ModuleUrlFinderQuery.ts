import { IQuery } from '@nestjs/cqrs';

export class ModuleUrlFinderQuery implements IQuery {
  constructor(private readonly _name: string) {}

  get name(): string {
    return this._name;
  }
}

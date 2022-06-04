import { IQuery } from "@nestjs/cqrs";

export class FindRoleQuery implements IQuery {
  constructor(private _type: string) {}

  public get type(): string {
    return this._type;
  }
}
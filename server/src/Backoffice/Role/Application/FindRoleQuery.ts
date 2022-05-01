import { IQuery } from "Shared/Domain/Interfaces/IQuery";


export class FindRoleQuery implements IQuery {
  constructor(private _type: string) {}

  public get type(): string {
    return this._type;
  }
}
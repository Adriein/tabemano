import { IQuery } from "Shared/Domain/Interfaces/IQuery";

export class FindPricingQuery implements IQuery {
  public static fromJson(json: any): FindPricingQuery {
    return new FindPricingQuery(json.name);
  }

  constructor(private readonly _name: string) {}

  public get name(): string {
    return this._name;
  }
}
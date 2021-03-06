import { IQuery } from "@nestjs/cqrs";

export class FindPricingQuery implements IQuery {
  public static fromRequest(req: any): FindPricingQuery {
    return new FindPricingQuery(req.currentUser.id);
  }

  constructor(private readonly _tenantId: string) {}

  public get tenantId(): string {
    return this._tenantId;
  }
}
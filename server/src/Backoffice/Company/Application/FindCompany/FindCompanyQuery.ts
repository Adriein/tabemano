import { IQuery } from "@nestjs/cqrs";

export class FindCompanyQuery implements IQuery {
  constructor(private readonly _tenantId: string) {}
  
  public get tenantId(): string {
    return this._tenantId;
  }
}
import { IQuery } from "@nestjs/cqrs";
import { GetTenantProfileApiRequest } from "Authorization/Auth/Infrastructure/Controller/GetTenantProfile/GetTenantProfileApiRequest";

export class GetTenantProfileQuery implements IQuery {
  constructor(private readonly _email: string) {}

  public static fromJson(json: GetTenantProfileApiRequest): GetTenantProfileQuery {
    return new GetTenantProfileQuery(json.email);
  }

  get email(): string {
    return this._email;
  }
}
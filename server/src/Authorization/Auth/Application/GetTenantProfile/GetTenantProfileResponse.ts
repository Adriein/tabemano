import { Auth } from 'Authorization/Auth/Domain/Entity/Auth';

export class GetTenantProfileResponse {
  public static fromDomain(auth: Auth): GetTenantProfileResponse {
    return new GetTenantProfileResponse(auth.id().value);
  }

  constructor(readonly id: string) {}
}

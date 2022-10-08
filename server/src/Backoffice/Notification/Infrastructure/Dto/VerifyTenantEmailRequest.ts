import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";

export class VerifyTenantEmailRequest {
  constructor(
    private readonly tenant: Tenant
  ) {}

  public serialize(): any {
    return {
      "nickname": this.tenant.name().value,
      "from_email": this.tenant.email().value,
      "from_name": this.tenant.name().value,
      "reply_to": this.tenant.email().value,
      "reply_to_name": this.tenant.name().value,
      "address": this.tenant.company().address().value,
      "address2": this.tenant.company().address().value,
      "state": this.tenant.company().country().value,
      "city": this.tenant.company().city().value,
      "country": this.tenant.company().country().value,
      "zip": this.tenant.company().zip().value
    }
  }
}
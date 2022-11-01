import { Tenant } from "Backoffice/Notification/Domain/Entity/Tenant";

export type SendGridVerifyEmailDto = {
  nickname: string,
  from_email: string,
  from_name: string,
  reply_to: string,
  reply_to_name: string,
  address: string,
  address2: string,
  state: string,
  city: string,
  country: string,
  zip: string
}

export class VerifyTenantEmailRequest {
  constructor(
    private readonly tenant: Tenant,
    private readonly adminEmail: string,
  ) {}

  public serialize(): SendGridVerifyEmailDto {
    return {
      "nickname": this.tenant.name().value,
      "from_email": this.adminEmail,
      "from_name": this.tenant.name().value,
      "reply_to": this.tenant.email().value,
      "reply_to_name": this.tenant.name().value,
      "address": this.tenant.company().address().value,
      "address2": this.tenant.company().address().value,
      "state": this.tenant.company().country().value.slice(0, 2),
      "city": this.tenant.company().city().value,
      "country": this.tenant.company().country().value,
      "zip": this.tenant.company().zip().value
    }
  }
}
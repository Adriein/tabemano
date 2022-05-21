import { Serializable } from "Backoffice/Shared/Domain/Serializable";
import { Tenant } from "Backoffice/Tenant/Domain/Entity/Tenant";

export class FindTenantResponse implements Serializable {
  public static fromDomain(tenant: Tenant): FindTenantResponse {

  }

  constructor(private) {}
}
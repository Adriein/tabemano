import { ICommand } from "@nestjs/cqrs";
import { ConfigureTenantApiRequest } from "Backoffice/Tenant/Infrastructure/Controller/ConfigureTenant/ConfigureTenantApiRequest";
import { TabemanoSession } from "Shared/Domain/constants";

export class ConfigureTenantCommand implements ICommand {
  public static fromJson(session: TabemanoSession, json: ConfigureTenantApiRequest): ConfigureTenantCommand {
    return new ConfigureTenantCommand(session.id, json.notificationEmail);
  }

  constructor(
    private readonly _tenantId: string,
    private readonly _notificationEmail: string,
  ) {}

  public get notificationEmail(): string {
    return this._notificationEmail;
  }

  public get tenantId(): string {
    return this._tenantId;
  }
}
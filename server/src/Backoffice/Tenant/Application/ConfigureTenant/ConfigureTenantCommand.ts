import { ICommand } from "@nestjs/cqrs";
import { ConfigureTenantApiRequest } from "Backoffice/Tenant/Infrastructure/Controller/ConfigureTenant/ConfigureTenantApiRequest";

export class ConfigureTenantCommand implements ICommand {
  public static fromJson(json: ConfigureTenantApiRequest): ConfigureTenantCommand {
    return new ConfigureTenantCommand(json.notificationEmail);
  }

  constructor(
    private readonly _notificationEmail: string,
  ) {}

  public get notificationEmail(): string {
    return this._notificationEmail;
  }
}
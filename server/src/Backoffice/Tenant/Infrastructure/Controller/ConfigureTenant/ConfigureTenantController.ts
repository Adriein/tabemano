import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigureTenantCommand } from "Backoffice/Tenant/Application/ConfigureTenant/ConfigureTenantCommand";
import { ConfigureTenantApiRequest } from "Backoffice/Tenant/Infrastructure/Controller/ConfigureTenant/ConfigureTenantApiRequest";
import { TabemanoSession } from "Shared/Domain/constants";
import { User } from "Shared/Infrastructure/Decorator/User";
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';

@Controller()
export class ConfigureTenantController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post('/configure')
  public async register(@User() session: TabemanoSession, @Body() body: ConfigureTenantApiRequest): Promise<void> {
    const command = ConfigureTenantCommand.fromJson(session, body);

    await this.commandBus.execute(command);
  }
}

import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ConfigureTenantCommand } from "Backoffice/Tenant/Application/ConfigureTenant/ConfigureTenantCommand";
import { ConfigureTenantApiRequest } from "Backoffice/Tenant/Infrastructure/Controller/ConfigureTenant/ConfigureTenantApiRequest";
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';

@Controller()
export class RegisterClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post('/configure')
  public async register(@Body() body: ConfigureTenantApiRequest): Promise<void> {
    const command = ConfigureTenantCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}

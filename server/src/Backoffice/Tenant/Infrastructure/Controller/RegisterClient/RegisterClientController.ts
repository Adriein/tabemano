import { Body, Controller, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { RegisterClientCommand } from 'Backoffice/Tenant/Application/RegisterClient/RegisterClientCommand';
import { RegisterClientApiRequest } from 'Backoffice/Tenant/Infrastructure/Controller/RegisterClient/RegisterClientApiRequest';
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';

@Controller()
export class RegisterClientController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post('/register/client')
  public async register(@Body() body: RegisterClientApiRequest): Promise<void> {
    const command = RegisterClientCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}

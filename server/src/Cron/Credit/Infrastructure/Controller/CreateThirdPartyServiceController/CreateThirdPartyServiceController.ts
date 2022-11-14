import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateThirdPartyServiceCommand } from 'Cron/Credit/Application/CreateThirdPartyService/CreateThirdPartyServiceCommand';
import { ADMIN_ROLE } from 'Shared/Domain/constants';
import { Roles } from 'Shared/Infrastructure/Decorator/Roles';
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';
import { RoleGuard } from 'Shared/Infrastructure/Guard/RoleGuard';
import { CreateThirdPartyServiceApiRequest } from './CreateThirdPartyServiceApiRequest';

@Controller()
export class CreateThirdPartyServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/third-party-service')
  @UseGuards(AuthGuard, RoleGuard)
  @Roles(ADMIN_ROLE)
  public async create(@Body() body: CreateThirdPartyServiceApiRequest): Promise<void> {
    const command = CreateThirdPartyServiceCommand.fromJson(body);
    await this.commandBus.execute(command);
  }
}

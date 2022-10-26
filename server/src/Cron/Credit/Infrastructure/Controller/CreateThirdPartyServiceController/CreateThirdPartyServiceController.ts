import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateThirdPartyServiceCommand } from 'Cron/Credit/Application/CreateThirdPartyService/CreateThirdPartyServiceCommand';
import { Log } from 'Shared/Domain/Decorators/Log';
import { CreateThirdPartyServiceApiRequest } from './CreateThirdPartyServiceApiRequest';

@Controller()
export class CreateThirdPartyServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/third-party-service')
  @Log()
  public async create(@Body() body: CreateThirdPartyServiceApiRequest): Promise<void> {
    const command = CreateThirdPartyServiceCommand.fromJson(body);
    await this.commandBus.execute(command);
  }
}

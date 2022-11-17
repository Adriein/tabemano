import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateThirdPartyServiceCommand } from 'Cron/Credit/Application/CreateThirdPartyService/CreateThirdPartyServiceCommand';
import { LimitedAccessToAdmin } from 'Shared/Infrastructure/Decorator/LimitedAccessToAdmin';
import { CreateThirdPartyServiceApiRequest } from './CreateThirdPartyServiceApiRequest';

@Controller()
export class CreateThirdPartyServiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/third-party-service')
  @UseInterceptors(ClassSerializerInterceptor)
  @LimitedAccessToAdmin()
  public async create(@Body() body: CreateThirdPartyServiceApiRequest): Promise<void> {
    const command = CreateThirdPartyServiceCommand.fromJson(body);
    await this.commandBus.execute(command);
  }
}

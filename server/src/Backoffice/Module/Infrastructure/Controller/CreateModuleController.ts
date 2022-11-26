import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateModuleCommand } from 'Backoffice/Module/Application/CreateModule/CreateModuleCommand';
import { LimitedAccessToAdmin } from 'Shared/Infrastructure/Decorator/LimitedAccessToAdmin';
import { CreateModuleApiRequest } from './CreateModuleApiRequest';

@Controller()
export class CreateModuleController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/module')
  @UseInterceptors(ClassSerializerInterceptor)
  @LimitedAccessToAdmin()
  public async create(@Body() body: CreateModuleApiRequest): Promise<void> {
    const command = CreateModuleCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}

import { Body, ClassSerializerInterceptor, Controller, Post, UseInterceptors } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from 'Backoffice/Product/Application/CreateProduct/CreateProductCommand';
import { LimitedAccessToAdmin } from 'Shared/Infrastructure/Decorator/LimitedAccessToAdmin';
import { CreateProductApiRequest } from './CreateProductApiRequest';

@Controller()
export class CreateProductController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/product')
  @UseInterceptors(ClassSerializerInterceptor)
  @LimitedAccessToAdmin()
  public async create(@Body() body: CreateProductApiRequest): Promise<void> {
    const command = CreateProductCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}

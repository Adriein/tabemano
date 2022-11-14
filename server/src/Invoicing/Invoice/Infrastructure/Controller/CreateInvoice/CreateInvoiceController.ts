import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateInvoiceCommand } from 'Invoicing/Invoice/Application/CreateInvoice/CreateInvoiceCommand';
import { ADMIN_ROLE } from 'Shared/Domain/constants';
import { Roles } from 'Shared/Infrastructure/Decorator/Roles';
import { AuthGuard } from 'Shared/Infrastructure/Guard/AuthGuard';
import { PermissionGuard } from 'Shared/Infrastructure/Guard/PermissionGuard';
import { RoleGuard } from 'Shared/Infrastructure/Guard/RoleGuard';

@Controller()
export class CreateInvoiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/create/invoice')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard, PermissionGuard, RoleGuard)
  @Roles(ADMIN_ROLE)
  public async createInvoice(@Body() body: any, @Session() session: any): Promise<any> {
    console.log('CREATE INVOICE');

    return;
    return await this.commandBus.execute(
      new CreateInvoiceCommand(
        '10fd679e-0fc1-45ed-98b1-f9988fb76e3f',
        'e2691b41-20a7-4586-8c92-003a47d9da27'
      )
    );
  }
}

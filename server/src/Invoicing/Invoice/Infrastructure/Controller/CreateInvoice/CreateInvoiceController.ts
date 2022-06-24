import { Body, ClassSerializerInterceptor, Controller, Get, Session, UseInterceptors } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";

@Controller('/create/invoice')
export class CreateInvoiceController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  public async createInvoice(
    @Body() body: any,
    @Session() session: any
  ): Promise<any> {
    return await this.commandBus.execute({});
  }
}
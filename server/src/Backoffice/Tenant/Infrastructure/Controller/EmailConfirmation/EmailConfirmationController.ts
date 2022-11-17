import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { EmailConfirmationApiRequest } from "Backoffice/Tenant/Infrastructure/Controller/EmailConfirmation/EmailConfirmationApiRequest";

@Controller()
export class EmailConfirmationController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/confirm')
  public async register(@Body() body: EmailConfirmationApiRequest): Promise<void> {
    console.log(body)
  }
}

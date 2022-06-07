import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantApiRequest } from "Authorization/Infrastructure/Controller/RegisterTenant/RegisterTenantApiRequest";

@Controller()
export class RegisterTenantController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register')
  public async register(
    @Body() body: RegisterTenantApiRequest
  ): Promise<void> {
    const command = RegisterTenantCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}
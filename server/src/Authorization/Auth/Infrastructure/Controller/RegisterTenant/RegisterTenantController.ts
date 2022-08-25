import { Body, Controller, Post } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Auth/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantApiRequest } from "Authorization/Auth/Infrastructure/Controller/RegisterTenant/RegisterTenantApiRequest";

@Controller()
export class RegisterTenantController {
  constructor(private readonly commandBus: CommandBus) {}

  @Post('/register/tenant')
  public async register(
    @Body() body: RegisterTenantApiRequest
  ): Promise<void> {
    const command = RegisterTenantCommand.fromJson(body);

    await this.commandBus.execute(command);
  }
}
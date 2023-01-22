import { Body, Controller, Post, Session } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterTenantCommand } from "Authorization/Auth/Application/RegisterTenant/RegisterTenantCommand";
import { RegisterTenantApiRequest } from "Authorization/Auth/Infrastructure/Controller/RegisterTenant/RegisterTenantApiRequest";
import jwt from "jsonwebtoken";
import { TENANT_ROLE } from "Shared/Domain/constants";

@Controller()
export class RegisterTenantController {
  constructor(private readonly commandBus: CommandBus, private readonly config: ConfigService) {}

  @Post('/register/tenant')
  public async register(
    @Body() body: RegisterTenantApiRequest,
    @Session() session: any
  ): Promise<void> {
    const command = RegisterTenantCommand.fromJson(body);

    await this.commandBus.execute(command);

    session.user = jwt.sign(
      {
        name: command.name,
        email: command.email,
        permissions: [],
        role: TENANT_ROLE,
      },
      this.config.get<string>('JWT_KEY')!
    );
  }
}
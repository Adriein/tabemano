import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { RegisterCompanyCommand } from "Backoffice/Company/Application/RegisterCompany/RegisterCompanyCommand";
import { RegisterCompanyApiRequest } from "Backoffice/Company/Infrastructure/Controller/RegisterCompany/RegisterCompanyApiRequest";
import { TabemanoSession } from "Shared/Domain/constants";
import { User } from "Shared/Infrastructure/Decorator/User";
import { AuthGuard } from "Shared/Infrastructure/Guard/AuthGuard";

@Controller()
export class RegisterCompanyController {
  constructor(private readonly commandBus: CommandBus) {}

  @UseGuards(AuthGuard)
  @Post('/company/register')
  public async register(@User() session: TabemanoSession, @Body() body: RegisterCompanyApiRequest): Promise<void> {
    const command = RegisterCompanyCommand.fromJson(body, session.id);

    await this.commandBus.execute(command);
  }
}
import { Controller, Get } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CheckExpiredSubscriptionsCommand } from "Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";

@Controller('/cron/check-expired-subscriptions')
export class CheckExpiredSubscriptionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  public async signIn(): Promise<void> {
    await this.commandBus.execute(new CheckExpiredSubscriptionsCommand());
  }
}
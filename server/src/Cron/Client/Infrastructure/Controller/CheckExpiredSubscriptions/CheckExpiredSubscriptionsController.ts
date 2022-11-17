import { Controller, Get } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CheckExpiredSubscriptionsCommand } from "Cron/Client/Application/CheckExpiredSubscriptions/CheckExpiredSubscriptionsCommand";

@Controller()
export class CheckExpiredSubscriptionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('/cron/check-expired-subscriptions')
  public async checkExpiredSubscriptions(): Promise<void> {
    await this.commandBus.execute(new CheckExpiredSubscriptionsCommand());
  }
}
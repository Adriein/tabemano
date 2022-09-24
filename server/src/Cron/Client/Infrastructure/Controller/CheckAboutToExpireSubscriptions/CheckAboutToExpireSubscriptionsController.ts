import { Controller, Get } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { CheckAboutToExpireSubscriptionsCommand } from "Cron/Client/Application/CheckAboutToExpireSubscriptions/CheckAboutToExpireSubscriptionsCommand";

@Controller('/cron/check-about-to-expire-subscriptions')
export class CheckAboutToExpireSubscriptionsController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  public async checkAboutToExpireSubscriptions(): Promise<void> {
    await this.commandBus.execute(new CheckAboutToExpireSubscriptionsCommand());
  }
}
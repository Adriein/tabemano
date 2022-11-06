import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CheckIfRemainingCreditIsCloseToRunningOutCommand } from 'Cron/Credit/Application/CheckIfRemainingCreditIsCloseToRunningOut/CheckIfRemainingCreditIsCloseToRunningOut';

@Controller()
export class CheckIfRemainingCreditIsCloseToRunningOutController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('cron/check-remaining-credit')
  public async checkIfRemainingCreditIsCloseToRunningOut(): Promise<void> {
    await this.commandBus.execute(new CheckIfRemainingCreditIsCloseToRunningOutCommand());
  }
}

import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateRemainingCreditCommand } from 'Cron/Credit/Application/UpdateRemainingCredit/UpdateRemainingCreditCommand';

@Controller()
export class UpdateRemainingCreditController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get('cron/update-remaining-credit')
  public async updateRemainingCredit(): Promise<void> {
    await this.commandBus.execute(new UpdateRemainingCreditCommand());
  }
}

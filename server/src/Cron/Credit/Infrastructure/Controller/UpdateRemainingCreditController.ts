import { Controller, Get } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { UpdateRemainingCreditCommand } from 'Cron/Credit/Application/UpdateRemainingCredit/UpdateRemainingCreditCommand';

@Controller('cron/update-remaining-credit')
export class UpdateRemainingCreditController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  public async checkExpiredSubscriptions(): Promise<void> {
    await this.commandBus.execute(new UpdateRemainingCreditCommand());
  }
}

import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceAlreadyExistsError } from 'Cron/Credit/Domain/Error/ThirdPartyServiceAlreadyExistsError';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { NumberVo } from 'Shared/Domain/Vo/Number.vo';
import { CreateThirdPartyServiceCommand } from './CreateThirdPartyServiceCommand';

@CommandHandler(CreateThirdPartyServiceCommand)
export class CreateThirdPartyServiceCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IThirdPartyServiceRepository')
    private readonly thirdPartyServiceRepository: IThirdPartyServiceRepository
  ) {}

  @Log()
  public async execute(command: CreateThirdPartyServiceCommand) {
    const name = new Name(command.name);
    const remainingCredit = new NumberVo(command.remainingCredit);
    const minRemainingCreditBeforeNotifying = new NumberVo(
      command.minRemainingCreditBeforeNotifying
    );

    await this.checkThirdPartyServiceDoesNotExist(name);

    const thirdPartyService = ThirdPartyService.build(
      name,
      remainingCredit,
      minRemainingCreditBeforeNotifying,
      command.notify
    );

    await this.thirdPartyServiceRepository.save(thirdPartyService);
  }

  private async checkThirdPartyServiceDoesNotExist(name: Name): Promise<void> {
    const filter = ThirdPartyServiceFilter.create().withThirdPartyServiceName(name);

    const result = await this.thirdPartyServiceRepository.findOne(filter);

    if (result.isOk) {
      throw new ThirdPartyServiceAlreadyExistsError();
    }
  }
}

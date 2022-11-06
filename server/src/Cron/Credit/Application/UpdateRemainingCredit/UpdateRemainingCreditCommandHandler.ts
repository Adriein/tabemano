import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { IThirdPartyServiceAbstractFactory } from 'Shared/Domain/Factory/IThirdPartyServiceAbstractFactory';
import { ThirdPartyServiceFinder } from '../Services/ThirdPartyServiceFinder';
import { UpdateRemainingCreditCommand } from './UpdateRemainingCreditCommand';

@CommandHandler(UpdateRemainingCreditCommand)
export class UpdateRemainingCreditCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IThirdPartyServiceRepository')
    private readonly thirdPartyServiceRepository: IThirdPartyServiceRepository,
    @Inject('IThirdPartyServiceAbstractFactory')
    private readonly factory: IThirdPartyServiceAbstractFactory,
    @Inject('ThirdPartyServiceFinder')
    private readonly getThirdPartyServiceList: ThirdPartyServiceFinder
  ) {}

  @Log()
  public async execute(command: UpdateRemainingCreditCommand): Promise<void> {
    const filter = ThirdPartyServiceFilter.create();
    const thirdPartyServiceList = await this.getThirdPartyServiceList.execute(filter);

    for (const thirdPartyService of thirdPartyServiceList) {
      const service = this.factory.createRemainingCreditServiceRetriever(thirdPartyService.name());
      await thirdPartyService.updateRemainingCredit(service);
      await this.thirdPartyServiceRepository.update(thirdPartyService);
    }
  }
}

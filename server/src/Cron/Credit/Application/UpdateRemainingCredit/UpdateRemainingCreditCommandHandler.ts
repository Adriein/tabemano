import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { IThirdPartyServiceAbstractFactory } from 'Shared/Domain/Factory/IThirdPartyServiceAbstractFactory';
import { UpdateRemainingCreditCommand } from './UpdateRemainingCreditCommand';

@CommandHandler(UpdateRemainingCreditCommand)
export class UpdateRemainingCreditCommandHandler implements ICommandHandler {
  constructor(
    @Inject('IThirdPartyServiceRepository')
    private readonly thirdPartyServiceRepository: IThirdPartyServiceRepository,
    @Inject('IThirdPartyServiceAbstractFactory')
    private readonly factory: IThirdPartyServiceAbstractFactory
  ) {}

  @Log()
  public async execute(command: UpdateRemainingCreditCommand): Promise<void> {
    const serviceList = await this.getServiceList();

    serviceList.forEach(async (thirdPartyService: ThirdPartyService) => {
      const service = this.factory.createRemainingCreditServiceRetriever(thirdPartyService.name());
      await thirdPartyService.updateRemainingCredit(service);
      await this.thirdPartyServiceRepository.update(thirdPartyService);
    });
  }

  private async getServiceList(): Promise<ThirdPartyService[]> {
    const filter = ThirdPartyServiceFilter.create();

    const result = await this.thirdPartyServiceRepository.find(filter);

    return result.unwrap();
  }
}

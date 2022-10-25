import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { Log } from 'Shared/Domain/Decorators/Log';
import { IThirdPartyServiceAbstractFactory } from 'Shared/Domain/Factory/IThirdPartyServiceAbstractFactory';
import { Name } from 'Shared/Domain/Vo/Name.vo';
import { UpdateRemainingCreditCommand } from './UpdateRemainingCreditCommand';
import { SENDGRID } from 'Shared/Domain/constants';
import { ID } from 'Shared/Domain/Vo/Id.vo';

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
    // STARTS TESTS!!!!!
    // console.log('UPDATE REMAINING CREDIT COMMAND HANDLER EXECUTE');

    // const thirdPartyService = new ThirdPartyService(
    //   ID.generate(),
    //   new Name(SENDGRID),
    //   13,
    //   5,
    //   false
    // );

    // const service = this.factory.createRemainingCreditServiceRetriever(thirdPartyService.name());

    // await thirdPartyService.updateRemainingCredit(service);

    // END TESTS!!!!

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

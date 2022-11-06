import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { ThirdPartyServiceFilter } from 'Cron/Credit/Domain/Filter/ThirdPartyServiceFilter';
import { IThirdPartyServiceRepository } from 'Cron/Credit/Domain/Repository/IThirdPartyServiceRepository';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class ThirdPartyServiceFinder {
  constructor(
    @Inject('IThirdPartyServiceRepository')
    private readonly thirdPartyServiceRepository: IThirdPartyServiceRepository
  ) {}

  public async execute(filter: ThirdPartyServiceFilter): Promise<ThirdPartyService[]> {
    const result = await this.thirdPartyServiceRepository.find(filter);

    return result.unwrap();
  }
}

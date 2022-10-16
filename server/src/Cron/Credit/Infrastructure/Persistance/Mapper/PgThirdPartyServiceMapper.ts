import { ThirdPartyService } from 'Cron/Credit/Domain/Entity/ThirdPartyService';
import { IMapper } from 'Shared/Domain/Interfaces/IMapper';
import { ThirdPartyServiceModel } from '../Model/ThirdPartyServiceModel';

export class PgThirdPartyServiceMapper implements IMapper<ThirdPartyService, ThirdPartyServiceModel> {
    toModel(entity: ThirdPartyService): ThirdPartyServiceModel {
        throw new Error('Method not implemented.');
    }

    toDomain(dataModel: ThirdPartyServiceModel): ThirdPartyService {
        throw new Error('Method not implemented.');
    }
  
}

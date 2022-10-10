import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { ThirdPartyService } from '../Entity/ThirdPartyService';

export interface IThirdPartyServiceRetriever extends IRepository<ThirdPartyService> {}

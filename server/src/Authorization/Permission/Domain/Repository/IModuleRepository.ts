import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Product } from '../Entity/Product';

export interface IModuleRepository extends IRepository<Product> {}

import { IRepository } from 'Shared/Domain/Interfaces/IRepository';
import { Product } from '../Entity/Product';

export interface IProductRepository extends IRepository<Product> {}

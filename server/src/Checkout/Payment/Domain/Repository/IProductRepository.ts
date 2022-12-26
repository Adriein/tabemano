import { Product } from "Checkout/Payment/Domain/Entity/Product";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IProductRepository extends IRepository<Product> {}
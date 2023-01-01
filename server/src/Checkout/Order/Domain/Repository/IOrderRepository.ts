import { Order } from "Checkout/Order/Domain/Entity/Order";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IOrderRepository extends IRepository<Order> {}
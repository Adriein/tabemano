import { Customer } from "Checkout/Payment/Domain/Entity/Customer";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface ICustomerRepository extends IRepository<Customer> {}
import { PaymentAttempt } from "Checkout/Payment/Domain/Entity/PaymentAttempt";
import { IRepository } from "Shared/Domain/Interfaces/IRepository";

export interface IPaymentAttemptRepository extends IRepository<PaymentAttempt> {}
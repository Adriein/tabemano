import { PaymentAttempt } from "Checkout/Payment/Domain/Entity/PaymentAttempt";

export interface IPaymentService {
  createPayment(attempt: PaymentAttempt): Promise<string>;
}
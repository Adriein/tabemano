import { PaymentAttempt } from "Checkout/Payment/Domain/Entity/PaymentAttempt";

export interface PaymentService {
  createPayment(attempt: PaymentAttempt): Promise<string>;
}
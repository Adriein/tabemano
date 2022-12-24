import { Product } from "Checkout/Product/Domain/Entity/Product";

export interface PaymentService {
  createPayment(product: Product): Promise<string>;
}
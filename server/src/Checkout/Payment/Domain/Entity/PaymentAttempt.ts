import { Customer } from "Checkout/Payment/Domain/Entity/Customer";
import { Product } from "Checkout/Payment/Domain/Entity/Product";
import { PaymentService } from "Checkout/Payment/Domain/Service/PaymentService";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Url } from "Shared/Domain/Vo/Url.vo";

export class PaymentAttempt extends AggregateRoot {
  public static build(
    successUrl: Url,
    cancelUrl: Url,
    customer: Customer,
    product: Product,
    sessionToken?: string,
  ): PaymentAttempt {
    return new PaymentAttempt(
      ID.generate(),
      successUrl,
      cancelUrl,
      customer,
      product,
      sessionToken,
    )
  }

  constructor(
    _id: ID,
    private _successUrl: Url,
    private _cancelUrl: Url,
    private _customer: Customer,
    private _product: Product,
    private _sessionToken?: string,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public async start(service: PaymentService): Promise<void> {
    this._sessionToken = await service.createPayment(this);
  }
}
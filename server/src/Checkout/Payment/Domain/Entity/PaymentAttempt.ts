import { PaymentSucceededDomainEvent } from "Checkout/Payment/Application/UpdatePaymentAttempt/PaymentSucceededDomainEvent";
import { Customer } from "Checkout/Payment/Domain/Entity/Customer";
import { Product } from "Checkout/Payment/Domain/Entity/Product";
import { IPaymentAttemptRepository } from "Checkout/Payment/Domain/Repository/IPaymentAttemptRepository";
import { IPaymentService } from "Checkout/Payment/Domain/Service/IPaymentService";
import { PAYMENT_ATTEMPT_STATUS } from "Checkout/Shared/Domain/constants";
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
      PAYMENT_ATTEMPT_STATUS.started,
      sessionToken,
    )
  }

  constructor(
    _id: ID,
    private _successUrl: Url,
    private _cancelUrl: Url,
    private _customer: Customer,
    private _product: Product,
    private _status: string,
    private _sessionToken?: string,
    _createdAt?: Date,
    _updatedAt?: Date
  ) {
    super(_id, _createdAt, _updatedAt);
  }

  public async markAsCompleted(repository: IPaymentAttemptRepository): Promise<void> {
    this._status = PAYMENT_ATTEMPT_STATUS.completed;
    await repository.update(this);

    super.apply(new PaymentSucceededDomainEvent(this.id(), this._customer.id(), this._product.id()))
    super.commit();
  }

  public markAsFailed(): void {
    this._status = PAYMENT_ATTEMPT_STATUS.failed;
  }

  public markAsDisputed(): void {
    this._status = PAYMENT_ATTEMPT_STATUS.disputed;
  }

  public async start(service: IPaymentService): Promise<void> {
    this._sessionToken = await service.createPayment(this);
  }
}
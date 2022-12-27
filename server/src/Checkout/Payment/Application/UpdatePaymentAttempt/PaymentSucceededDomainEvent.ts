import { DomainEvent } from "Shared/Domain/Entities/DomainEvent";
import { ID } from "Shared/Domain/Vo/Id.vo";

export class PaymentSucceededDomainEvent extends DomainEvent {
  protected _type = 'tabemano.checkout.1.event.payment.succeeded';

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _customerId: ID,
    private readonly _productId: ID,
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get customerId(): ID {
    return this._customerId;
  }

  public get productId(): ID {
    return this._productId;
  }

  public get type(): string {
    return this._type;
  }

  public serialize(): string {
    return JSON.stringify({
      id: this.id.value,
      dateOccurred: this.dateOccurred.value,
      aggregateId: this._aggregateId.value,
      tenantId: this._customerId.value,
      moduleId: this._productId.value
    });
  }
}
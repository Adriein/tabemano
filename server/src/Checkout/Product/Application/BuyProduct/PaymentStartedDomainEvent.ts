import { DomainEvent } from 'Shared/Domain/Entities/DomainEvent';
import { ID } from 'Shared/Domain/Vo/Id.vo';

export class PaymentStartedDomainEvent extends DomainEvent {
  protected _type = 'tabemano.checkout.1.event.payment.started';

  constructor(
    protected readonly _aggregateId: ID,
    private readonly _tenantId: ID,
    private readonly _productId: ID,
    private readonly _paymentSession: any,
  ) {
    super();
  }

  public get aggregateId(): ID {
    return this._aggregateId;
  }

  public get tenantId(): ID {
    return this._tenantId;
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
      tenantId: this._tenantId.value,
      moduleId: this._productId.value
    });
  }
}

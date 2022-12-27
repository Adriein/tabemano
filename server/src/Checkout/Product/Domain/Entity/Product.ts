import { IPaymentService } from "Checkout/Payment/Domain/Service/IPaymentService";
import { PaymentStartedDomainEvent } from "Checkout/Product/Application/BuyProduct/PaymentStartedDomainEvent";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Money } from "Shared/Domain/Entities/Money";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Product extends AggregateRoot {
  constructor(
    id: ID,
    private _name: Name,
    private _price: Money,
    _dateCreated?: Date,
    _dateUpdated?: Date
  ) {
    super(id);
  }

  public name(): Name {
    return this._name;
  }

  public price(): Money {
    return this._price;
  }

  public buy(customerId: ID): void {
    super.apply(new PaymentStartedDomainEvent(this.id(), customerId, this.id()));
    super.commit();
  }
}
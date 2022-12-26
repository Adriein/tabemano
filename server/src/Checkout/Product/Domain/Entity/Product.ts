import { PaymentService } from "Checkout/Payment/Domain/Service/PaymentService";
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

  public buy(): void {

  }
}
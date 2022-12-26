import { Money } from "Shared/Domain/Entities/Money";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Product {
  constructor(
    private _id: ID,
    private _name: Name,
    private _price: Money
  ) {}
  
  public id(): ID {
    return this._id;
  }

  public name(): Name {
    return this._name;
  }

  public price(): Money {
    return this._price;
  }
}
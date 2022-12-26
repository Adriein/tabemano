import { Email } from "Shared/Domain/Vo/Email.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Name } from "Shared/Domain/Vo/Name.vo";

export class Customer {
  constructor(
    private _id: ID,
    private _name: Name,
    private _email: Email
  ) {}


  public id(): ID {
    return this._id;
  }

  public name(): Name {
    return this._name;
  }

  public email(): Email {
    return this._email;
  }
}
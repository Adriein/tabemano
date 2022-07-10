import { CompanyType } from "Invoicing/Company/Domain/Vo/CompanyType";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { CompanyName } from "Invoicing/Company/Domain/Vo/CompanyName";
import { FiscalId } from "Invoicing/Company/Domain/Vo/FiscalId";
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Company extends AggregateRoot {
  constructor(
    _id: ID,
    private _name: CompanyName,
    private _fiscalId: FiscalId,
    private _address: Address,
    private _phone: Phone,
    private _type: CompanyType
  ) {
    super(_id);
  }


  public name(): CompanyName {
    return this._name;
  }

  public fiscalId(): FiscalId {
    return this._fiscalId;
  }

  public address(): Address {
    return this._address;
  }

  public phone(): Phone {
    return this._phone;
  }

  public type(): CompanyType {
    return this._type;
  }
}
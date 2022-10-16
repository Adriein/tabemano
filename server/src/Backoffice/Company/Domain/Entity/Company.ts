import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { CompanyName } from "Shared/Domain/Vo/CompanyName.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";

export class Company extends AggregateRoot {
  public static build(
    name: CompanyName,
    fiscalId: FiscalId,
    address: Address,
    phone: Phone,
    type: CompanyType,
    country: Country,
  ): Company {
    return new Company(ID.generate(), name, fiscalId, address, phone, type, country);
  }

  constructor(
    _id: ID,
    private _name: CompanyName,
    private _fiscalId: FiscalId,
    private _address: Address,
    private _phone: Phone,
    private _type: CompanyType,
    private _country: Country,
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

  public country(): Country {
    return this._country;
  }
}
import { AggregateRoot } from "Shared/Domain/Entities/AggregateRoot";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { City } from "Shared/Domain/Vo/City.vo";
import { CompanyName } from "Shared/Domain/Vo/CompanyName.vo";
import { CompanyType } from "Shared/Domain/Vo/CompanyType.vo";
import { Country } from "Shared/Domain/Vo/Country.vo";
import { FiscalId } from "Shared/Domain/Vo/FiscalId.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Phone } from "Shared/Domain/Vo/Phone.vo";
import { State } from "Shared/Domain/Vo/State.vo";

export class Company extends AggregateRoot {
  public static build(
    name: CompanyName,
    fiscalId: FiscalId,
    address: Address,
    phone: Phone,
    type: CompanyType,
    country: Country,
    state: State,
    city: City,
    tenantId: ID,
  ): Company {
    return new Company(ID.generate(), name, fiscalId, address, phone, type, country, state, city, tenantId);
  }

  constructor(
    _id: ID,
    private _name: CompanyName,
    private _fiscalId: FiscalId,
    private _address: Address,
    private _phone: Phone,
    private _type: CompanyType,
    private _country: Country,
    private _state: State,
    private _city: City,
    private _tenantId: ID
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

  public state(): State {
    return this._state;
  }

  public city(): City {
    return this._city;
  }

  public tenantId(): ID {
    return this._tenantId;
  }
}
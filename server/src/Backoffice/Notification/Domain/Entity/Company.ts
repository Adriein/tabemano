import { Country } from "Invoicing/Company/Domain/Vo/Country";
import { Address } from "Shared/Domain/Vo/Address.vo";
import { City } from "Shared/Domain/Vo/City.vo";
import { ID } from "Shared/Domain/Vo/Id.vo";
import { Zip } from "Shared/Domain/Vo/Zip.vo";

export class Company {
  constructor(
    private readonly _id: ID,
    private readonly _address: Address,
    private readonly _country: Country,
    private readonly _city: City,
    private readonly _zip: Zip
  ) {}
  
  public id(): ID {
    return this._id;
  }

  public address(): Address {
    return this._address;
  }

  public country(): Country {
    return this._country;
  }

  public city(): City {
    return this._city;
  }

  public zip(): Zip {
    return this._zip;
  }
}
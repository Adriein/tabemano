import { ICommand } from "@nestjs/cqrs";
import { RegisterCompanyApiRequest } from "Backoffice/Company/Infrastructure/Controller/RegisterCompany/RegisterCompanyApiRequest";

export class RegisterCompanyCommand implements ICommand {
  public static fromJson(json: RegisterCompanyApiRequest, tenantId: string) {
    return new RegisterCompanyCommand(
      json.name,
      json.fiscalId,
      json.address,
      json.phone,
      json.type,
      json.country,
      json.state,
      json.city,
      tenantId
    );
  }

  constructor(
    private _name: string,
    private _fiscalId: string,
    private _address: string,
    private _phone: string,
    private _type: string,
    private _country: string,
    private _state: string,
    private _city: string,
    private _tenantId: string,
  ) {}


  get name(): string {
    return this._name;
  }

  get fiscalId(): string {
    return this._fiscalId;
  }

  get address(): string {
    return this._address;
  }

  get phone(): string {
    return this._phone;
  }

  get type(): string {
    return this._type;
  }

  get country(): string {
    return this._country;
  }

  get state(): string {
    return this._state;
  }

  get city(): string {
    return this._city;
  }

  get tenantId(): string {
    return this._tenantId;
  }
}
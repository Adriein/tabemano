import { ICommand } from "@nestjs/cqrs";

export class RegisterCompanyCommand implements ICommand {
  constructor(
    private _name: string,
    private _fiscalId: string,
    private _address: string,
    private _phone: number,
    private _type: string
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

  get phone(): number {
    return this._phone;
  }

  get type(): string {
    return this._type;
  }
}
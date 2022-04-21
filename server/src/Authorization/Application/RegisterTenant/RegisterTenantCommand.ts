import { ICommand } from "Shared/Domain/Interfaces/ICommand";

export class RegisterTenantCommand implements ICommand {
  public static fromJson(json: any): RegisterTenantCommand {
    return new RegisterTenantCommand(json.name, json.email, json.password);
  }

  constructor(private readonly _name: string, private readonly _email: string, private readonly _password: string) {}


  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get password(): string {
    return this._password;
  }
}
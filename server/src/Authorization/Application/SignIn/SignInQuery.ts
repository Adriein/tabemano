import { IQuery } from "Shared/Domain/Interfaces/IQuery";

export class SignInQuery implements IQuery {
  constructor(private readonly _email: string, private readonly _password: string) {}

  public static fromJson(json: any): SignInQuery {
    return new SignInQuery(json.name, json.password);
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
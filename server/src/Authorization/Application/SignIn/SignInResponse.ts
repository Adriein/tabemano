import { Auth } from "Authorization/Domain/Entities/Auth";

export class SignInResponse {
  public static fromDomain(auth: Auth): SignInResponse {
    return new SignInResponse(auth.id().value, auth.name().value, auth.email().value);
  }

  constructor(private readonly _id: string, private readonly _name: string, private readonly _email: string) {}

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get email(): string {
    return this._email;
  }
}
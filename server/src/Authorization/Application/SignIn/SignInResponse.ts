import { Auth } from "Authorization/Domain/Entity/Auth";

export class SignInResponse {
  public static fromDomain(auth: Auth): SignInResponse {
    return new SignInResponse(auth.id.value, auth.name.value, auth.email.value);
  }

  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string
  ) {}
}
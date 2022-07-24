import { ICommand } from "@nestjs/cqrs";

export class RegisterClientCommand implements ICommand {
  public static fromJson(req: any): RegisterClientCommand {
    return new RegisterClientCommand(
      req.body.name,
      req.body.email,
      req.body.pricingId,
      req.body.roleId,
      req.currentUser.id
    );
  }

  constructor(
    private _name: string,
    private _email: string,
    private _pricingId: string,
    private _roleId: string,
    private _tenantId: string
  ) {}


  public get name(): string {
    return this._name;
  }

  public get email(): string {
    return this._email;
  }

  public get tenantId(): string {
    return this._tenantId;
  }

  public get pricingId(): string {
    return this._pricingId;
  }

  public get roleId(): string {
    return this._roleId;
  }
}